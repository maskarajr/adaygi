import { ethers } from 'ethers';
import { config } from '../config';

// ABI for ERC20 tokens
const ERC20_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)'
];

export class Web3Service {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contracts: {
    [key: string]: ethers.Contract;
  };

  constructor() {
    this.provider = new ethers.JsonRpcProvider(config.web3.rpcUrl);
    this.wallet = new ethers.Wallet(config.web3.privateKey, this.provider);
    
    // Initialize contracts
    this.contracts = {
      USDT: new ethers.Contract(config.web3.contracts.USDT, ERC20_ABI, this.wallet),
      USDC: new ethers.Contract(config.web3.contracts.USDC, ERC20_ABI, this.wallet)
    };
  }

  async transferToken(
    token: 'USDT' | 'USDC',
    to: string,
    amount: string
  ) {
    try {
      const contract = this.contracts[token];
      const tx = await contract.transfer(to, amount);
      const receipt = await tx.wait();
      return {
        success: true,
        txHash: receipt.hash
      };
    } catch (error) {
      console.error('Transfer error:', error);
      return {
        success: false,
        error: 'Transfer failed'
      };
    }
  }

  async getBalance(token: 'USDT' | 'USDC') {
    const contract = this.contracts[token];
    const balance = await contract.balanceOf(this.wallet.address);
    return balance.toString();
  }
}