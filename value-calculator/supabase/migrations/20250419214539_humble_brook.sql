/*
  # Fix RLS policies for apps and pricing tables

  1. Changes
    - Update RLS policies to allow proper access to both tables
    - Ensure public read access
    - Allow authenticated users to perform operations
    
  2. Security
    - Maintain RLS protection while fixing access issues
    - Allow necessary operations for authenticated users
*/

-- Drop existing policies for apps
DROP POLICY IF EXISTS "Enable read access for all users" ON apps;
DROP POLICY IF EXISTS "Enable insert for empty table" ON apps;
DROP POLICY IF EXISTS "Enable full access for admin" ON apps;

-- Create new policies for apps
CREATE POLICY "Enable read access for all users"
ON apps FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable authenticated user operations"
ON apps FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Drop existing policies for pricing
DROP POLICY IF EXISTS "Enable read access for all users" ON pricing;
DROP POLICY IF EXISTS "Enable authenticated user operations" ON pricing;

-- Create new policies for pricing
CREATE POLICY "Enable read access for all users"
ON pricing FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable authenticated user operations"
ON pricing FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure we have a default pricing row
INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;