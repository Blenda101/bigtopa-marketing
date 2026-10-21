/*
  # Pricing models

  1. Changes
    - `apps.pricing_type` ('per_user' | 'flat'): per_user = cost × people, flat = cost per org
    - `sites.flat_monthly` + `sites.per_user_monthly`: BigTopa price is
      (flat_monthly + per_user_monthly × people) × 12 per year

  2. Data
    - Existing apps stay per_user
    - per_user_monthly backfilled from the old annual-per-user `base_price` so results don't shift
    - Old `sites.base_price` / `sites.price_per_user` are no longer read
*/

ALTER TABLE apps ADD COLUMN IF NOT EXISTS pricing_type text NOT NULL DEFAULT 'per_user'
  CHECK (pricing_type IN ('per_user', 'flat'));

ALTER TABLE sites ADD COLUMN IF NOT EXISTS flat_monthly numeric NOT NULL DEFAULT 0 CHECK (flat_monthly >= 0);
ALTER TABLE sites ADD COLUMN IF NOT EXISTS per_user_monthly numeric NOT NULL DEFAULT 0 CHECK (per_user_monthly >= 0);

UPDATE sites SET per_user_monthly = round(COALESCE(base_price, 0) / 12.0, 2), flat_monthly = 0;
