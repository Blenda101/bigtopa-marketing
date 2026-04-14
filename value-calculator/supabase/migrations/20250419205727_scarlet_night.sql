/*
  # Fix pricing table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Add new policies that properly handle public access and updates
    - Ensure pricing table has exactly one row
    
  2. Security
    - Allow public read access
    - Allow insert only when table is empty
    - Allow updates to existing row
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON pricing;
DROP POLICY IF EXISTS "Enable insert for first record" ON pricing;
DROP POLICY IF EXISTS "Enable admin management" ON pricing;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON pricing FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for empty table"
ON pricing FOR INSERT
TO public
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM pricing
  )
);

CREATE POLICY "Enable update of existing row"
ON pricing FOR UPDATE
TO public
USING (id = 1)
WITH CHECK (id = 1);

-- Ensure we have a default row
INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;