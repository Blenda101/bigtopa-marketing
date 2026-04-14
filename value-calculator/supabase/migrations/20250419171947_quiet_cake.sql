/*
  # Update RLS policies for apps table

  1. Changes
    - Modify INSERT policy to allow authenticated users to insert apps
    - Keep existing policies for admin access and read access

  2. Security
    - Maintains RLS enabled on apps table
    - Ensures authenticated users can insert new apps
    - Preserves admin full access policy
    - Keeps public read access policy
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Allow authenticated users to insert apps" ON apps;

-- Create new INSERT policy that allows authenticated users to insert apps
CREATE POLICY "Allow authenticated users to insert apps"
ON apps
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);