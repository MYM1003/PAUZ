import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [error, setError] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast({
        title: "Error",
        description: "Token de verificación no válido",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    // Check if token is valid and get feedback data
    checkToken();
  }, [token]);

  const checkToken = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('verification_token', token)
        .eq('is_verified', false)
        .single();

      if (error || !data) {
        toast({
          title: "Error",
          description: "Token de verificación no válido o expirado",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      setFeedbackData(data);
    } catch (error) {
      console.error('Error checking token:', error);
      navigate('/');
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: feedbackData.email,
        password: password,
        options: {
          data: {
            full_name: feedbackData.nombre || 'Usuario'
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Error creating user account');
      }

      // Update feedback with user_id and mark as verified
      const { error: updateError } = await supabase
        .from('feedback')
        .update({
          user_id: authData.user.id,
          is_verified: true,
          verification_token: null
        })
        .eq('verification_token', token);

      if (updateError) {
        throw updateError;
      }

      setIsVerified(true);
      toast({
        title: "¡Cuenta verificada!",
        description: "Tu cuenta ha sido creada exitosamente. Ya puedes comenzar a acumular puntos."
      });

      // Redirect to profile after a moment
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (error: any) {
      console.error('Error during verification:', error);
      setError(error.message || 'Error al verificar la cuenta');
      toast({
        title: "Error",
        description: "Hubo un problema al verificar tu cuenta. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!feedbackData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando token...</p>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">¡Cuenta verificada!</h1>
          <p className="text-muted-foreground mb-6">
            Tu cuenta ha sido creada exitosamente. Ahora puedes comenzar a acumular puntos con cada compra.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirigiendo a tu perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/79a9c951-030b-430e-92fe-0ce9696dfa48.png" 
            alt="PAUZ" 
            className="h-12 mx-auto mb-6 opacity-90"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">Verifica tu cuenta</h1>
          <p className="text-muted-foreground mb-4">
            Hola <strong>{feedbackData.nombre || feedbackData.email}</strong>, crea una contraseña para tu cuenta
          </p>
          <p className="text-sm text-muted-foreground">
            Una vez verificada, podrás acumular puntos y acceder a promociones exclusivas.
          </p>
        </div>

        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
              Contraseña *
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-2 block">
              Confirmar Contraseña *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Crear mi cuenta'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;