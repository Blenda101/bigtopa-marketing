/*
  # Update pricing table RLS policies

  1. Changes
    - Drop existing policies to avoid conflicts
    - Add policy to allow inserting initial pricing record when no records exist
    - Add policy to allow authenticated users to read pricing data
    - Add policy to allow admin to update pricing

  2. Security
    - Enable RLS on pricing table
    - Add policies for:
      - Reading pricing data (all authenticated users)
      - Inserting initial pricing record
      - Updating pricing (admin only)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read pricing" ON pricing;
DROP POLICY IF EXISTS "Allow insert when no pricing exists" ON pricing;
DROP POLICY IF EXISTS "Allow admin to update pricing" ON pricing;

-- Enable RLS
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read pricing data
CREATE POLICY "Allow authenticated users to read pricing"
  ON pricing
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow inserting initial pricing record when no records exist
CREATE POLICY "Allow insert when no pricing exists"
  ON pricing
  FOR INSERT
  TO authenticated
  WITH CHECK (
    NOT EXISTS (
      SELECT 1 FROM pricing
    )
  );

-- Allow admin to update pricing
CREATE POLICY "Allow admin to update pricing"
  ON pricing
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
  )
  WITH CHECK (
    (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
  );