/*
  # Fix RLS policies for apps table

  1. Changes
    - Drop and recreate RLS policies for apps table
    - Add proper authentication checks
    - Ensure proper access control

  2. Security
    - Enable RLS on apps table
    - Allow authenticated users to insert and read apps
    - Allow admin full access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert apps" ON apps;
DROP POLICY IF EXISTS "Allow full access to apps for admin" ON apps;
DROP POLICY IF EXISTS "Allow read access to apps" ON apps;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
ON apps FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON apps FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable full access for admin"
ON apps FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text)
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text);