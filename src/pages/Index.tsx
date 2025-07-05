import React from 'react';
import FeedbackForm from '@/components/FeedbackForm';

const Index = () => {
  const webhookUrl = new URLSearchParams(window.location.search).get('webhook') || '';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/79a9c951-030b-430e-92fe-0ce9696dfa48.png" 
            alt="PAUZ" 
            className="h-12 mx-auto mb-6 opacity-90"
          />
        </div>
        <FeedbackForm webhookUrl={webhookUrl} />
      </div>
    </div>
  );
};

export default Index;