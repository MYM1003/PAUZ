import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Email o contraseña incorrectos');
          } else {
            setError(error.message);
          }
        } else {
          navigate('/');
        }
      } else {
        if (!fullName.trim()) {
          setError('El nombre completo es requerido');
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('User already registered')) {
            setError('Este email ya está registrado');
          } else {
            setError(error.message);
          }
        } else {
          setError('');
          alert('¡Cuenta creada exitosamente! Por favor verifica tu email para activar tu cuenta.');
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/79a9c951-030b-430e-92fe-0ce9696dfa48.png" 
            alt="PAUZ" 
            className="h-8 mx-auto mb-8 opacity-90"
          />
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? 'Log in to PAUZ' : 'Sign up to PAUZ'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin 
              ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError('');
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError('');
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Log in
                  </button>
                </>
              )
            }
          </p>
        </div>

        <div className="resend-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="resend-input"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="resend-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="resend-input"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="resend-button w-full" 
              disabled={loading}
            >
              {loading 
                ? (isLogin ? 'Signing in...' : 'Creating account...') 
                : (isLogin ? 'Log in' : 'Sign up')
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}