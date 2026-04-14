/*
  # Fix pricing table data

  1. Changes
    - Ensure pricing table has exactly one row with id=1
    - Add ON CONFLICT handling to upsert pricing data
    
  2. Data
    - Insert default pricing values if no row exists
*/

-- First ensure we have exactly one row with id=1
DELETE FROM pricing WHERE id != 1;

-- Insert or update the pricing row with id=1
INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO UPDATE 
SET base_price = EXCLUDED.base_price,
    price_per_user = EXCLUDED.price_per_user,
    updated_at = now();