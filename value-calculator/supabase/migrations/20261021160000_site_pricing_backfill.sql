/*
  # Every site sets its own pricing

  Copies the default pricing row into any site without its own prices.
  The pricing row stays only as a last-resort fallback for the embed.
*/

UPDATE sites SET
  base_price = COALESCE(base_price, (SELECT base_price FROM pricing WHERE id = 1)),
  price_per_user = COALESCE(price_per_user, (SELECT price_per_user FROM pricing WHERE id = 1));
