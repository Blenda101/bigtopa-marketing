/*
  # Update pricing table RLS policies

  1. Changes
    - Add policy to allow admin users to update pricing records
    - Remove the insert-only-when-empty policy as it's too restrictive
    - Keep the existing read access policy for all users
    
  2. Security
    - Only admin users can modify pricing data
    - All users can read pricing data
    - Maintains data integrity by ensuring only authorized updates
*/

-- Drop the existing insert-only policy as we're replacing it with a more comprehensive one
DROP POLICY IF EXISTS "Enable insert for empty table" ON pricing;

-- Drop the existing admin policy to recreate it with proper permissions
DROP POLICY IF EXISTS "Enable admin full access" ON pricing;

-- Create a new policy that allows admin to perform all operations
CREATE POLICY "Enable admin operations"
ON pricing
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
)
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'admin@example.com'::text
);

-- Keep the existing read policy
-- Note: We don't need to recreate it as it's already in place:
-- "Enable read access for all users" with qual "true" for SELECT to public