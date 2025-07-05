import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import FeedbackForm from '@/components/FeedbackForm';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const webhookUrl = new URLSearchParams(window.location.search).get('webhook') || '';

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/lovable-uploads/79a9c951-030b-430e-92fe-0ce9696dfa48.png" 
            alt="PAUZ" 
            className="h-12 mx-auto mb-6 opacity-90"
          />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/79a9c951-030b-430e-92fe-0ce9696dfa48.png" 
            alt="PAUZ" 
            className="h-12 mx-auto mb-6 opacity-90"
          />
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Bienvenido, {user.email}
            </p>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
        <FeedbackForm webhookUrl={webhookUrl} />
      </div>
    </div>
  );
};

export default Index;