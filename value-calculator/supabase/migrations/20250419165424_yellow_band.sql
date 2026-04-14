/*
  # Seed pricing table with default values
  
  1. Changes
    - Insert default pricing row with id=1
    - Set base price to 499
    - Set price per user to 10
    
  2. Notes
    - Only one row should exist in the pricing table
    - The id=1 is required by the application
*/

INSERT INTO pricing (id, base_price, price_per_user)
VALUES (1, 499, 10)
ON CONFLICT (id) DO NOTHING;