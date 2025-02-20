import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

// Environment variables would be loaded from .env
export const config = {
  supabase: createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  ),
  
  // Web3 Configuration
  web3: {
    rpcUrl: process.env.RPC_URL || 'https://bsc-dataseed.binance.org/',
    privateKey: process.env.RELAYER_PRIVATE_KEY!,
    contracts: {
      USDT: '0x55d398326f99059fF775485246999027B3197955', // BSC USDT
      USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // BSC USDC
    }
  },
  
  // PayFast Configuration
  payfast: {
    merchantId: process.env.PAYFAST_MERCHANT_ID!,
    merchantKey: process.env.PAYFAST_MERCHANT_KEY!,
    passPhrase: process.env.PAYFAST_PASSPHRASE!,
    testMode: process.env.NODE_ENV !== 'production'
  }
};