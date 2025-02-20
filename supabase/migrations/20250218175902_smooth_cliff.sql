/*
  # Create transactions table

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text, either 'buy' or 'sell')
      - `crypto_asset` (text, either 'USDT' or 'USDC')
      - `crypto_amount` (numeric)
      - `fiat_amount` (numeric)
      - `status` (text)
      - `payment_id` (text, nullable)
      - `tx_hash` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to read their own transactions
    - Add policy for the service role to manage all transactions
*/

CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text CHECK (type IN ('buy', 'sell')) NOT NULL,
  crypto_asset text CHECK (crypto_asset IN ('USDT', 'USDC')) NOT NULL,
  crypto_amount numeric NOT NULL,
  fiat_amount numeric NOT NULL,
  status text CHECK (status IN ('pending', 'processing', 'completed', 'failed')) NOT NULL,
  payment_id text,
  tx_hash text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can read their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role can manage all transactions
CREATE POLICY "Service role can manage all transactions"
  ON transactions
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create an index for faster queries
CREATE INDEX transactions_user_id_idx ON transactions(user_id);
CREATE INDEX transactions_status_idx ON transactions(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();