/*
  # Update apps table RLS policies

  1. Changes
    - Add new RLS policy to allow initial data seeding when table is empty
    - Keep existing policies for admin and authenticated users

  2. Security
    - Maintains existing security for admin access
    - Allows seeding only when table is empty
    - Preserves authenticated user access
*/

-- Add policy to allow inserts when table is empty
CREATE POLICY "Enable insert for empty table"
  ON public.apps
  FOR INSERT
  TO authenticated
  WITH CHECK (
    NOT EXISTS (
      SELECT 1 FROM public.apps
    )
  );