import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebhookConfigProps {
  onWebhookChange: (url: string) => void;
  currentWebhook?: string;
}

const WebhookConfig: React.FC<WebhookConfigProps> = ({ 
  onWebhookChange, 
  currentWebhook = '' 
}) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState(currentWebhook);

  const handleSave = () => {
    onWebhookChange(webhookUrl);
    toast({
      title: "Webhook Configurado",
      description: "La URL del webhook ha sido guardada correctamente.",
    });
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe 
  src="${window.location.origin}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border-radius: 12px; background: #1a1a1a;">
</iframe>`;
    
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Código Copiado",
      description: "El código de embed ha sido copiado al portapapeles.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Configuración de Webhook</CardTitle>
          <CardDescription className="text-muted-foreground">
            Conecta el formulario con n8n, Zapier u otro servicio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="webhook" className="text-sm font-medium text-foreground mb-2 block">
              URL del Webhook
            </Label>
            <Input
              id="webhook"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="form-input"
            />
          </div>
          <Button onClick={handleSave} className="submit-button">
            Guardar Webhook
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Código de Embed</CardTitle>
          <CardDescription className="text-muted-foreground">
            Copia este código para insertar el formulario en tu sitio web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={copyEmbedCode}
            variant="outline"
            className="w-full"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copiar Código de Embed
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Enlaces Útiles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a 
            href="https://zapier.com/apps/webhook/help" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Crear Webhook en Zapier
          </a>
          <a 
            href="https://docs.n8n.io/integrations/trigger-nodes/webhook/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Crear Webhook en n8n
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookConfig;