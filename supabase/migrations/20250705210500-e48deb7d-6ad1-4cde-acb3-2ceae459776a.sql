-- Add new policy to allow authenticated users to insert their own verified feedback
CREATE POLICY "Users can insert their own verified feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (auth.uid() = user_id AND is_verified = true);