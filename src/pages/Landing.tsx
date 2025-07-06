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
          emailRedirectTo: `${window.location.origin}/`,
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
          description: "We've sent you a verification link to access the platform.",
        });
        // Store email in localStorage for verification process
        localStorage.setItem('pending_email', email.trim());
        navigate('/verify');
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
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/960f4cbc-b30e-4117-8856-b9a36b5d0fcd.png" 
            alt="PAUZ" 
            className="h-12 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Welcome to PAUZ
          </h1>
          <p className="text-muted-foreground">
            Enter your email to access your personalized dashboard
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input text-center text-lg py-4"
              disabled={loading}
            />
          </div>
          
          <Button
            type="submit"
            className="btn-gradient w-full py-4 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Sending..." : "Continue"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;