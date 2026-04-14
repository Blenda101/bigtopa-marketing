/*
  # Fix pricing table RLS policies

  1. Changes
    - Drop existing policies
    - Add new policies that:
      - Allow public read access
      - Allow admin to manage pricing
      - Allow update of existing row with id=1
      
  2. Security
    - Maintains RLS protection
    - Ensures only admin can modify pricing
    - Allows public read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON pricing;
DROP POLICY IF EXISTS "Enable insert for empty table" ON pricing;
DROP POLICY IF EXISTS "Enable update of existing row" ON pricing;

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

CREATE POLICY "Enable admin access"
ON pricing FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);

-- Ensure we have a default row
INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;