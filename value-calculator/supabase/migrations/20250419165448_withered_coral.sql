/*
  # Add default pricing row

  1. Changes
    - Insert default pricing row with id = 1
    - This ensures the pricing table always has at least one row
    - Default values:
      - base_price: 499
      - price_per_user: 10

  2. Security
    - No changes to RLS policies needed
*/

INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;