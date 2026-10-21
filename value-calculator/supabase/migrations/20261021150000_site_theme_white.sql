/*
  # Allow the 'white' theme on sites
*/

ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_theme_check;
ALTER TABLE sites ADD CONSTRAINT sites_theme_check CHECK (theme IN ('light', 'dark', 'white'));
