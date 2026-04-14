/*
  # Fix RLS policies for apps table

  1. Changes
    - Drop existing RLS policies that are causing issues
    - Create new, more permissive policies for initial data loading
    - Maintain admin-only access for modifications
    
  2. Security
    - Enable RLS on apps table
    - Allow initial data insertion when table is empty
    - Allow admin to perform all operations
    - Allow authenticated users to read apps
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable full access for admin" ON apps;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON apps;
DROP POLICY IF EXISTS "Enable insert for empty table" ON apps;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON apps;

-- Create new policies
CREATE POLICY "Enable full access for admin"
ON apps
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);

CREATE POLICY "Enable insert for empty table"
ON apps
FOR INSERT
TO authenticated
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM apps
  )
);

CREATE POLICY "Enable read access for all users"
ON apps
FOR SELECT
TO authenticated
USING (true);