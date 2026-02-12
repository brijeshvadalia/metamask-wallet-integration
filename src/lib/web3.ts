import { BrowserProvider } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  provider: BrowserProvider | null;
  signer: any;
}

export interface BalanceState {
  ethBalance: string;
  usdtBalance: string;
  isLoading: boolean;
  error: string | null;
}

export class Web3Service {
  private static instance: Web3Service;
  private provider: BrowserProvider | null = null;
  private signer: any = null;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async connectWallet(): Promise<WalletState> {
    try {
      const ethereumProvider = await detectEthereumProvider();
      
      if (!ethereumProvider) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      if (!(ethereumProvider as any).isMetaMask) {
        throw new Error('Please use MetaMask to connect your wallet.');
      }

      // Request account access
      await (ethereumProvider as any).request({
        method: 'eth_requestAccounts',
      });

      this.provider = new BrowserProvider(ethereumProvider as any);
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();

      return {
        isConnected: true,
        address,
        provider: this.provider,
        signer: this.signer,
      };
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }

  async disconnectWallet(): Promise<WalletState> {
    this.provider = null;
    this.signer = null;
    
    return {
      isConnected: false,
      address: null,
      provider: null,
      signer: null,
    };
  }

  async getETHBalance(address: string, provider?: BrowserProvider): Promise<string> {
    try {
      const balanceProvider = provider || this.provider;
      if (!balanceProvider) {
        throw new Error('Provider not initialized. Please connect your wallet first.');
      }

      const balance = await balanceProvider.getBalance(address);
      // Convert from Wei to ETH using formatEther
      const { formatEther } = await import('ethers');
      return formatEther(balance);
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch ETH balance: ${error.message}`);
      }
      throw new Error('Failed to fetch ETH balance');
    }
  }

  async getUSDTBalance(address: string, provider?: BrowserProvider): Promise<string> {
    try {
      const balanceProvider = provider || this.provider;
      if (!balanceProvider) {
        throw new Error('Provider not initialized. Please connect your wallet first.');
      }

      // USDT contract address on Ethereum Mainnet
      const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      
      // USDT ABI (only the balanceOf function)
      const usdtAbi = [
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)'
      ];

      const contract = new (await import('ethers')).Contract(
        usdtContractAddress,
        usdtAbi,
        balanceProvider
      );

      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      
      // Convert from smallest unit to USDT using formatUnits
      const { formatUnits } = await import('ethers');
      return formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error fetching USDT balance:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch USDT balance: ${error.message}`);
      }
      throw new Error('Failed to fetch USDT balance');
    }
  }

  async isWalletConnected(): Promise<boolean> {
    try {
      const ethereumProvider = await detectEthereumProvider();
      if (!ethereumProvider || !(ethereumProvider as any).isMetaMask) {
        return false;
      }

      const accounts = await (ethereumProvider as any).request({
        method: 'eth_accounts',
      });

      return accounts.length > 0;
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return false;
    }
  }

  async getConnectedAddress(): Promise<string | null> {
    try {
      const ethereumProvider = await detectEthereumProvider();
      if (!ethereumProvider || !(ethereumProvider as any).isMetaMask) {
        return null;
      }

      const accounts = await (ethereumProvider as any).request({
        method: 'eth_accounts',
      });

      return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Error getting connected address:', error);
      return null;
    }
  }
}
