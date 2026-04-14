/*
  # Update apps table RLS policies

  1. Changes
    - Drop existing policies
    - Add new comprehensive set of RLS policies
    - Allow authenticated users to read and insert
    - Allow admin full access
    
  2. Security
    - Maintains RLS protection
    - Ensures proper access control
    - Allows initial data seeding
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON apps;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON apps;
DROP POLICY IF EXISTS "Enable full access for admin" ON apps;
DROP POLICY IF EXISTS "Enable insert for empty table" ON apps;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
ON apps FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON apps FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for empty table"
ON apps FOR INSERT
TO authenticated
WITH CHECK (NOT EXISTS (SELECT 1 FROM apps apps_1));

CREATE POLICY "Enable full access for admin"
ON apps FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text)
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text);