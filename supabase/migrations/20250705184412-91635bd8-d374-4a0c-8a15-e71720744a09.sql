-- Modify feedback table to allow temporary submissions without user accounts initially
-- Add email verification system

-- Create table for pending verifications
CREATE TABLE public.pending_verifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  verification_token text NOT NULL UNIQUE,
  feedback_data jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '24 hours')
);

-- Enable RLS for pending verifications
ALTER TABLE public.pending_verifications ENABLE ROW LEVEL SECURITY;

-- Only allow service role to manage pending verifications
CREATE POLICY "Service role can manage pending verifications" 
ON public.pending_verifications 
FOR ALL 
USING (auth.role() = 'service_role');

-- Modify feedback table to allow nullable user_id temporarily during the verification process
ALTER TABLE public.feedback ALTER COLUMN user_id DROP NOT NULL;

-- Add verification status to feedback
ALTER TABLE public.feedback ADD COLUMN is_verified boolean NOT NULL DEFAULT false;
ALTER TABLE public.feedback ADD COLUMN verification_token text;

-- Update feedback policies to allow unverified submissions
DROP POLICY "Users can insert their own feedback" ON public.feedback;
DROP POLICY "Users can view their own feedback" ON public.feedback;

-- New policies for the verification flow
CREATE POLICY "Anyone can insert unverified feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (user_id IS NULL AND is_verified = false);

CREATE POLICY "Users can view their own verified feedback" 
ON public.feedback 
FOR SELECT 
USING (auth.uid() = user_id AND is_verified = true);

CREATE POLICY "Service role can manage all feedback" 
ON public.feedback 
FOR ALL 
USING (auth.role() = 'service_role');