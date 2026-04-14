/*
  # Fix pricing table RLS policies

  1. Changes
    - Drop existing RLS policies for pricing table
    - Add new policies that:
      - Allow anyone to read pricing
      - Allow admin to manage pricing
      - Allow creation of first record if none exists
      
  2. Security
    - Maintains RLS protection
    - Ensures only admin can modify pricing after initial setup
    - Allows public read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin to update pricing" ON pricing;
DROP POLICY IF EXISTS "Allow authenticated users to read pricing" ON pricing;
DROP POLICY IF EXISTS "Allow insert access to pricing for admin" ON pricing;
DROP POLICY IF EXISTS "Allow insert when no pricing exists" ON pricing;
DROP POLICY IF EXISTS "Allow read access to pricing" ON pricing;
DROP POLICY IF EXISTS "Allow update access to pricing for admin" ON pricing;
DROP POLICY IF EXISTS "Allow update of existing pricing" ON pricing;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON public.pricing FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for first record"
ON public.pricing FOR INSERT
TO authenticated
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM public.pricing
  )
);

CREATE POLICY "Enable admin management"
ON public.pricing FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);