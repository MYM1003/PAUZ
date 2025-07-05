import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  name: string;
  verificationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, verificationToken }: VerificationEmailRequest = await req.json();

    const verificationUrl = `${Deno.env.get("SUPABASE_URL")?.replace('//', '//')}/verify?token=${verificationToken}`;

    const emailResponse = await resend.emails.send({
      from: "PAUZ <onboarding@resend.dev>",
      to: [email],
      subject: "¡Verifica tu cuenta y comienza a ganar puntos!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">¡Gracias por tu feedback!</h1>
          
          <p>Hola ${name || 'amigo'},</p>
          
          <p>Hemos recibido tu reseña y queremos que comiences a ganar puntos con nosotros. 
          Para verificar tu cuenta y comenzar a acumular puntos por tus compras, haz clic en el botón de abajo:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Verificar mi cuenta
            </a>
          </div>
          
          <p><strong>¿Qué obtienes al verificar tu cuenta?</strong></p>
          <ul>
            <li>✅ Comenzar a acumular puntos por cada compra</li>
            <li>🎁 Acceso a promociones exclusivas</li>
            <li>📧 Recibir ofertas especiales por email</li>
            <li>🏆 Canjear puntos por descuentos y premios</li>
          </ul>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:<br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
          
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            Si no solicitaste esta verificación, puedes ignorar este email.
          </p>
        </div>
      `,
    });

    console.log("Verification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-verification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);