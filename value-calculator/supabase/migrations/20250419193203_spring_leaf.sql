/*
  # Fix RLS policies for apps and pricing tables

  1. Changes
    - Drop existing policies
    - Add new policies that allow:
      - Public read access for both tables
      - Admin full access
      - Initial data insertion
    
  2. Security
    - Maintain proper access control
    - Allow public read access
    - Restrict write operations appropriately
*/

-- Drop existing policies for apps
DROP POLICY IF EXISTS "Enable full access for admin" ON apps;
DROP POLICY IF EXISTS "Enable insert for empty table" ON apps;
DROP POLICY IF EXISTS "Enable read access for all users" ON apps;

-- Create new policies for apps
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

-- Drop existing policies for pricing
DROP POLICY IF EXISTS "Enable read access for all users" ON pricing;
DROP POLICY IF EXISTS "Enable insert for first record" ON pricing;
DROP POLICY IF EXISTS "Enable admin management" ON pricing;

-- Create new policies for pricing
CREATE POLICY "Enable read access for all users"
ON pricing FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for first record"
ON pricing FOR INSERT
TO public
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM pricing pricing_1
  )
);

CREATE POLICY "Enable admin management"
ON pricing FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);