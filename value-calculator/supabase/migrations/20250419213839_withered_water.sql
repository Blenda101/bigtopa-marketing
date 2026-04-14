/*
  # Fix pricing table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Add new policies that properly handle pricing updates
    - Ensure proper access control for pricing management
    
  2. Security
    - Allow public read access
    - Allow authenticated users to update pricing
    - Maintain single row constraint
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable admin operations" ON pricing;
DROP POLICY IF EXISTS "Enable read access for all users" ON pricing;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON pricing FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable authenticated user operations"
ON pricing FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure we have a default row
INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;