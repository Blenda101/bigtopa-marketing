/*
  # Per-site theme and accent

  1. Changes
    - `sites.theme` (text, 'light' | 'dark', nullable — NULL renders light)
    - `sites.accent` (text, #RRGGBB, nullable — NULL uses the default accent)

  2. Data
    - Seed from the colours previously hardcoded in each site's embed
*/

ALTER TABLE sites ADD COLUMN IF NOT EXISTS theme text CHECK (theme IN ('light', 'dark'));
ALTER TABLE sites ADD COLUMN IF NOT EXISTS accent text CHECK (accent ~ '^#[0-9A-Fa-f]{6}$');

UPDATE sites SET theme = 'dark', accent = '#E8621A' WHERE id = 'bigtopa' AND theme IS NULL;
UPDATE sites SET theme = 'light', accent = '#C4713A' WHERE id IN ('gatheragain', 'greekhouse') AND theme IS NULL;
