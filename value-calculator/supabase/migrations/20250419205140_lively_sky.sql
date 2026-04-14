/*
  # Fix pricing table data and constraints

  1. Changes
    - Ensure exactly one row exists with id=1
    - Add trigger to prevent multiple rows
    - Update existing data
    
  2. Security
    - Maintain existing RLS policies
    - Add constraint for single row
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

-- Create a trigger to prevent multiple rows
CREATE OR REPLACE FUNCTION prevent_multiple_pricing_rows()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM pricing) > 0 AND NEW.id != 1 THEN
    RAISE EXCEPTION 'Only one pricing row with id=1 is allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_single_pricing_row ON pricing;
CREATE TRIGGER ensure_single_pricing_row
  BEFORE INSERT OR UPDATE ON pricing
  FOR EACH ROW
  EXECUTE FUNCTION prevent_multiple_pricing_rows();