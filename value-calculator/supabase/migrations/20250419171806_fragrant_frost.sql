/*
  # Add insert policy for apps table

  1. Changes
    - Add new policy to allow authenticated users to insert new apps
    
  2. Security
    - Maintains existing RLS policies
    - Adds new policy for INSERT operations
    - Ensures data integrity while allowing necessary operations
*/

-- Add policy to allow authenticated users to insert new apps
CREATE POLICY "Allow authenticated users to insert apps" 
ON public.apps
FOR INSERT 
TO authenticated
WITH CHECK (true);