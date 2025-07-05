import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface FeedbackFormProps {
  webhookUrl?: string;
  className?: string;
}

interface FormData {
  email: string;
  name: string;
  review: string;
  acceptsPromotions: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  webhookUrl, 
  className = "" 
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || '',
    name: '',
    review: '',
    acceptsPromotions: false
  });
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { email?: string } = {};
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Generate verification token
      const verificationToken = crypto.randomUUID();
      
      // Save unverified feedback to database
      const { error: dbError } = await supabase
        .from('feedback')
        .insert({
          user_id: null, // Will be set after verification
          email: formData.email,
          nombre: formData.name || '',
          reseña: formData.review || '',
          acepta_terminos: formData.acceptsPromotions,
          is_verified: false,
          verification_token: verificationToken
        });

      if (dbError) {
        throw new Error(dbError.message);
      }

      // Send verification email via edge function
      const { error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          email: formData.email,
          name: formData.name,
          verificationToken: verificationToken
        }
      });

      if (emailError) {
        console.warn('Verification email failed to send:', emailError);
        // Don't fail the submission if email fails
      }

      // Also send to webhook if provided (for external integrations)
      if (webhookUrl) {
        try {
          const submitData = {
            email: formData.email,
            name: formData.name || null,
            review: formData.review || null,
            acceptsPromotions: formData.acceptsPromotions,
            timestamp: new Date().toISOString(),
            source: 'feedback-form',
            verification_pending: true
          };

          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData),
          });

          if (!response.ok) {
            console.warn('Webhook failed, but database save succeeded');
          }
        } catch (webhookError) {
          console.warn('Webhook failed:', webhookError);
          // Don't fail the main submission if webhook fails
        }
      }

      setNeedsVerification(true);
      toast({
        title: "¡Gracias!",
        description: "Hemos recibido tu feedback. Te enviamos un email para verificar tu cuenta y comenzar a acumular puntos.",
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu feedback. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (needsVerification) {
    return (
      <div className={`feedback-form ${className}`}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a1 1 0 001.42 0L21 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">¡Revisa tu email!</h2>
          <p className="text-muted-foreground mb-4">
            Te enviamos un enlace de verificación a <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Una vez que verifiques tu cuenta, podrás comenzar a acumular puntos y acceder a promociones exclusivas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`feedback-form ${className}`}>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium text-foreground mb-2">
          Tu opinión nos importa
        </h2>
        <p className="text-sm text-muted-foreground">
          Comparte tu experiencia con nosotros
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="tu@email.com"
            className="form-input"
            required
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
            Nombre (opcional)
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Tu nombre"
            className="form-input"
          />
        </div>

        <div>
          <Label htmlFor="review" className="text-sm font-medium text-foreground mb-2 block">
            ¿Cómo fue tu experiencia?
          </Label>
          <Textarea
            id="review"
            value={formData.review}
            onChange={(e) => handleInputChange('review', e.target.value)}
            placeholder="Cuéntanos sobre tu experiencia..."
            className="form-textarea"
          />
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="promotions"
            checked={formData.acceptsPromotions}
            onCheckedChange={(checked) => handleInputChange('acceptsPromotions', checked as boolean)}
            className="mt-0.5"
          />
          <Label 
            htmlFor="promotions" 
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            ✅ Acepto sumar puntos y recibir promociones por email
          </Label>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Feedback'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;