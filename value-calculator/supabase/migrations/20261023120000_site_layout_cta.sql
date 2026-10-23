/*
  # Per-site calculator layout, price visibility and call-to-action

  1. Changes
    - `sites.layout` ('compact' | 'split'): single panel with in-place reveal, or
      side-by-side available apps / apps we use with a live summary
    - `sites.show_price` (boolean): show BigTopa cost and savings (off for custom B2B pricing)
    - `sites.cta_label`, `sites.cta_url`: optional button under the results
*/

ALTER TABLE sites ADD COLUMN IF NOT EXISTS layout text NOT NULL DEFAULT 'compact'
  CHECK (layout IN ('compact', 'split'));
ALTER TABLE sites ADD COLUMN IF NOT EXISTS show_price boolean NOT NULL DEFAULT true;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS cta_label text;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS cta_url text CHECK (cta_url IS NULL OR cta_url ~* '^https?://');
