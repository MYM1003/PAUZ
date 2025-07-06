import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, '');
        if (error) {
          setError(error.message);
        } else {
          toast({
            title: "Check your email",
            description: "We've sent you a verification link to activate your account.",
          });
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with go back and centered logo */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/pauz-brand-logo.png" 
              alt="PAUZ" 
              className="h-8 w-8 rounded-lg object-cover cursor-pointer"
              onClick={() => navigate('/')}
            />
            <h1 
              className="text-xl font-bold text-foreground cursor-pointer" 
              onClick={() => navigate('/')}
            >
              PAUZ
            </h1>
          </div>
          
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            {isLogin ? 'Sign in to PAUZ' : 'Create your account'}
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
                    className="text-accent hover:underline font-medium"
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
                    className="text-accent hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )
            }
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="bg-input border-border text-foreground min-h-[48px]"
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
                className="bg-input border-border text-foreground min-h-[48px]"
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
              className="w-full min-h-[48px] bg-primary hover:bg-primary/90 text-primary-foreground" 
              disabled={loading}
            >
              {loading 
                ? (isLogin ? 'Signing in...' : 'Creating account...') 
                : (isLogin ? 'Sign in' : 'Create account')
              }
            </Button>
          </form>
        </div>
        
        {!isLogin && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            After creating your account, verify your email to start earning points!
          </p>
        )}
      </div>
    </div>
  );
}