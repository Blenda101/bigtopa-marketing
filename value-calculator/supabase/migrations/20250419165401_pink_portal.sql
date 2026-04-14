/*
  # Add default pricing data

  1. Changes
    - Insert default pricing record with id=1
    - Set default values:
      - base_price: 499
      - price_per_user: 10

  2. Notes
    - This ensures the pricing table always has at least one row
    - The default values match the initial state in ValueCalculatorContext
*/

INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;