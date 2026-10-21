/*
  # Per-site pricing overrides

  1. Changes
    - `sites.base_price` (numeric, nullable)
    - `sites.price_per_user` (numeric, nullable)

  2. Notes
    - NULL means "use the default pricing row" (pricing.id = 1)
*/

ALTER TABLE sites ADD COLUMN IF NOT EXISTS base_price numeric;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS price_per_user numeric;
