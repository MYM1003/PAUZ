import React, { useState } from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import WebhookConfig from '@/components/WebhookConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState('');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Formulario de Feedback Embeddable
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un formulario minimalista de feedback post-compra con tema oscuro, 
            integración de webhooks y diseño responsive.
          </p>
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Formulario Principal
                </h2>
                <p className="text-muted-foreground mb-6">
                  Este es el formulario que se embebería en tu sitio web después de una compra.
                </p>
              </div>
              
              <div className="w-full max-w-md mx-auto">
                <FeedbackForm webhookUrl={webhookUrl} />
              </div>
            </div>

            <div className="mt-12 p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-medium text-foreground mb-4">
                Características del Formulario
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Tema oscuro con acentos rojos
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Tipografía Inter moderna
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Validación de email en tiempo real
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Completamente responsive
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Integración con webhooks
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Texto en español
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="config">
            <WebhookConfig 
              onWebhookChange={setWebhookUrl}
              currentWebhook={webhookUrl}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;