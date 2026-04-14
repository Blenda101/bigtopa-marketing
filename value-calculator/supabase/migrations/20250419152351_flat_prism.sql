/*
  # Create pricing table and policies

  1. New Tables
    - `pricing`
      - `id` (integer, primary key, default 1)
      - `base_price` (numeric, default 499, not null)
      - `price_per_user` (numeric, default 10, not null)
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `pricing` table
    - Add policies for:
      - Admin can insert and update pricing
      - Anyone can insert when no pricing exists
      - All authenticated users can read pricing
      - Allow update of existing pricing with id = 1
*/

-- Create pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id integer PRIMARY KEY DEFAULT 1,
  base_price numeric DEFAULT 499 NOT NULL,
  price_per_user numeric DEFAULT 10 NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow insert access to pricing for admin" ON pricing;
  DROP POLICY IF EXISTS "Allow insert when no pricing exists" ON pricing;
  DROP POLICY IF EXISTS "Allow read access to pricing" ON pricing;
  DROP POLICY IF EXISTS "Allow update access to pricing for admin" ON pricing;
  DROP POLICY IF EXISTS "Allow update of existing pricing" ON pricing;
END $$;

-- Create policies
CREATE POLICY "Allow insert access to pricing for admin"
  ON pricing
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text);

CREATE POLICY "Allow insert when no pricing exists"
  ON pricing
  FOR INSERT
  TO authenticated
  WITH CHECK (NOT EXISTS (SELECT 1 FROM pricing));

CREATE POLICY "Allow read access to pricing"
  ON pricing
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow update access to pricing for admin"
  ON pricing
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text)
  WITH CHECK ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text);

CREATE POLICY "Allow update of existing pricing"
  ON pricing
  FOR UPDATE
  TO authenticated
  USING (id = 1)
  WITH CHECK (id = 1);