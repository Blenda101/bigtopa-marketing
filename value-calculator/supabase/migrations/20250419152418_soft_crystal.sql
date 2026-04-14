/*
  # Create apps table and policies

  1. New Tables
    - `apps`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, not null)
      - `logo` (text, not null)
      - `cost_per_user` (numeric, not null)
      - `category` (text, not null)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `apps` table
    - Add policies for:
      - Admin has full access
      - All authenticated users can read apps
*/

-- Create apps table
CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL,
  cost_per_user numeric NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow full access to apps for admin" ON apps;
  DROP POLICY IF EXISTS "Allow read access to apps" ON apps;
END $$;

-- Create policies
CREATE POLICY "Allow full access to apps for admin"
  ON apps
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text)
  WITH CHECK ((auth.jwt() ->> 'email'::text) = 'admin@example.com'::text);

CREATE POLICY "Allow read access to apps"
  ON apps
  FOR SELECT
  TO authenticated
  USING (true);