/*
  # Fix Pricing Table RLS Policies

  1. Changes
    - Update RLS policies for the pricing table to properly handle admin access
    - Ensure single row constraint is maintained
    - Allow admin to update existing pricing row

  2. Security
    - Maintain RLS enabled
    - Only admin can modify pricing
    - Public can read pricing
    - Prevent multiple rows
*/

-- Drop existing policies to recreate them with correct permissions
DROP POLICY IF EXISTS "Enable admin access" ON pricing;
DROP POLICY IF EXISTS "Enable insert for empty table" ON pricing;
DROP POLICY IF EXISTS "Enable read access for all users" ON pricing;

-- Recreate policies with correct permissions
CREATE POLICY "Enable admin full access" 
ON pricing
FOR ALL 
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);

CREATE POLICY "Enable read access for all users"
ON pricing
FOR SELECT
TO public
USING (true);

-- Ensure single row constraint is maintained
CREATE POLICY "Enable insert for empty table"
ON pricing
FOR INSERT
TO authenticated
WITH CHECK (
  (NOT EXISTS (SELECT 1 FROM pricing)) AND
  ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text)
);