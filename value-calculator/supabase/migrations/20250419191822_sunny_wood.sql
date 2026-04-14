/*
  # Fix RLS policies for apps table

  1. Changes
    - Drop all existing policies
    - Add new policies for proper access control
    - Enable public read access
    - Allow admin full access
    - Allow initial data insertion
    
  2. Security
    - Maintain RLS protection while allowing necessary operations
    - Public read access for all users
    - Admin retains full control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable full access for admin" ON apps;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON apps;
DROP POLICY IF EXISTS "Enable insert for empty table" ON apps;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON apps;
DROP POLICY IF EXISTS "Enable read access for all users" ON apps;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON apps FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for empty table"
ON apps FOR INSERT
TO public
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM apps apps_1
  )
);

CREATE POLICY "Enable full access for admin"
ON apps FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);