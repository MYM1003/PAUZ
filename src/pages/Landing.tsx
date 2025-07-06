import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a magic link to access your dashboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="text-center mb-10">
          <img 
            src="/lovable-uploads/pauz-logo-new.png" 
            alt="PAUZ" 
            className="h-16 w-16 mx-auto mb-8 rounded-2xl object-cover"
          />
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            Welcome to PAUZ
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Enter your email to access your personalized dashboard
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-8">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input text-center text-lg w-full"
              disabled={loading}
            />
          </div>
          
          <Button
            type="submit"
            className="btn-gradient w-full text-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Continue"}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;