// Token Service for ERC20 Meda Gas Token
// Handles reading token balance from Polygon blockchain

import { ethers } from 'ethers';

// Meda Gas Token Contract Address on Polygon
const MEDA_GAS_CONTRACT_ADDRESS = '0xEDfd96dD07b6eA11393c177686795771579f488a';

// Standard ERC20 ABI - only the functions we need
const ERC20_ABI = [
  // balanceOf function
  "function balanceOf(address owner) view returns (uint256)",
  // decimals function  
  "function decimals() view returns (uint8)",
  // name function
  "function name() view returns (string)",
  // symbol function
  "function symbol() view returns (string)"
];

class TokenService {
  constructor() {
    this.contract = null;
    this.provider = null;
  }

  // Initialize with Web3Auth provider
  async initialize(web3AuthProvider) {
    try {
      if (!web3AuthProvider) {
        throw new Error('Web3Auth provider is required');
      }

      // Create ethers provider from Web3Auth provider
      this.provider = new ethers.BrowserProvider(web3AuthProvider);
      
      // Create contract instance
      this.contract = new ethers.Contract(
        MEDA_GAS_CONTRACT_ADDRESS,
        ERC20_ABI,
        this.provider
      );

      console.log('Token service initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing token service:', error);
      return false;
    }
  }

  // Get Meda Gas token balance for a wallet address
  async getMedaGasBalance(walletAddress) {
    try {
      if (!this.contract) {
        throw new Error('Token service not initialized');
      }

      if (!walletAddress) {
        throw new Error('Wallet address is required');
      }

      console.log('Fetching Meda Gas balance for:', walletAddress);

      // Get balance in wei (smallest unit)
      const balanceWei = await this.contract.balanceOf(walletAddress);
      
      // Convert from wei to tokens (18 decimals)
      const balanceFormatted = ethers.formatEther(balanceWei);
      
      // Convert to number and round to 2 decimal places
      const balanceNumber = parseFloat(balanceFormatted);

      console.log('Meda Gas balance:', balanceNumber);
      
      return {
        balance: balanceNumber,
        balanceFormatted: balanceNumber.toLocaleString(undefined, { 
          minimumFractionDigits: 0, 
          maximumFractionDigits: 2 
        }),
        balanceWei: balanceWei.toString()
      };

    } catch (error) {
      console.error('Error fetching Meda Gas balance:', error);
      
      // Return zero balance on error
      return {
        balance: 0,
        balanceFormatted: '0',
        balanceWei: '0',
        error: error.message
      };
    }
  }

  // Get token info (name, symbol, decimals)
  async getTokenInfo() {
    try {
      if (!this.contract) {
        throw new Error('Token service not initialized');
      }

      const [name, symbol, decimals] = await Promise.all([
        this.contract.name(),
        this.contract.symbol(), 
        this.contract.decimals()
      ]);

      return {
        name,
        symbol,
        decimals: Number(decimals),
        contractAddress: MEDA_GAS_CONTRACT_ADDRESS
      };

    } catch (error) {
      console.error('Error fetching token info:', error);
      return {
        name: 'Meda Gas',
        symbol: 'MG', 
        decimals: 18,
        contractAddress: MEDA_GAS_CONTRACT_ADDRESS,
        error: error.message
      };
    }
  }

  // Check if service is ready
  isInitialized() {
    return this.contract !== null && this.provider !== null;
  }

  // Reset service (for logout)
  reset() {
    this.contract = null;
    this.provider = null;
    console.log('Token service reset');
  }
}

// Export singleton instance
export const tokenService = new TokenService();

// Export contract address for reference
export { MEDA_GAS_CONTRACT_ADDRESS };