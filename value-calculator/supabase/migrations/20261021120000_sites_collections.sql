/*
  # Sites / collections

  1. New Tables
    - `sites`
      - `id` (text, primary key) — slug used in the embed's data-site attribute
      - `label` (text, not null)
      - `created_at` (timestamptz, default now())

  2. Data
    - Seed the three existing sites
    - Backfill apps with an empty `sites` array to every existing site, so
      membership is explicit (empty no longer means "show everywhere")

  3. Security
    - Same policies as `apps`: public read, authenticated full access
*/

CREATE TABLE IF NOT EXISTS sites (
  id text PRIMARY KEY CHECK (id ~ '^[a-z0-9-]+$'),
  label text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON sites;
DROP POLICY IF EXISTS "Enable authenticated user operations" ON sites;

CREATE POLICY "Enable read access for all users"
  ON sites FOR SELECT TO public USING (true);

CREATE POLICY "Enable authenticated user operations"
  ON sites FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO sites (id, label) VALUES
  ('bigtopa', 'BigTopa'),
  ('greekhouse', 'GreekHouse'),
  ('gatheragain', 'GatherAgain')
ON CONFLICT (id) DO NOTHING;

UPDATE apps
SET sites = ARRAY['bigtopa', 'greekhouse', 'gatheragain']
WHERE sites IS NULL OR cardinality(sites) = 0;
