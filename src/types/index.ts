export interface Transaction {
  id: string;
  userId: string;
  type: 'buy' | 'sell';
  cryptoAsset: 'USDT' | 'USDC';
  cryptoAmount: number;
  fiatAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentId?: string;
  txHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  paymentUrl?: string;
  error?: string;
}

export interface Web3Response {
  success: boolean;
  txHash?: string;
  error?: string;
}