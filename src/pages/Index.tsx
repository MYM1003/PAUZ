import React from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const webhookUrl = new URLSearchParams(window.location.search).get('webhook') || '';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/960f4cbc-b30e-4117-8856-b9a36b5d0fcd.png" 
                alt="PAUZ" 
                className="h-8"
              />
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-foreground hover:text-primary"
            >
              Sign in
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Feedback for
            <br />
            <span className="text-primary">developers</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            The best way to collect authentic customer feedback.
          </p>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Simple, embeddable forms that actually get responses.
          </p>
        </div>

        {/* Feedback Form Section */}
        <div className="max-w-2xl mx-auto pb-20">
          <div className="resend-card">
            <FeedbackForm webhookUrl={webhookUrl} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;