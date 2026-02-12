'use client';

import { useState, useEffect, useCallback } from 'react';
import { Web3Service, WalletState, BalanceState } from '@/lib/web3';

const web3Service = Web3Service.getInstance();

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    provider: null,
    signer: null,
  });

  const [balanceState, setBalanceState] = useState<BalanceState>({
    ethBalance: '0',
    usdtBalance: '0',
    isLoading: false,
    error: null,
  });

  const [isConnecting, setIsConnecting] = useState(false);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const ethereumProvider = await (await import('@metamask/detect-provider')).default();
        if (ethereumProvider && (ethereumProvider as any).selectedAddress) {
          const provider = new (await import('ethers')).BrowserProvider(ethereumProvider as any);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          setWalletState({
            isConnected: true,
            address,
            provider,
            signer,
          });

          // Also update Web3Service provider
          web3Service['provider'] = provider;
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    const ethereum = (window as any).ethereum;
    
    if (ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          await disconnectWallet();
        } else if (accounts[0] !== walletState.address) {
          // User switched accounts
          const provider = new (await import('ethers')).BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          setWalletState({
            isConnected: true,
            address,
            provider,
            signer,
          });

          // Delay balance fetching to ensure provider is ready
          setTimeout(async () => {
            await fetchBalances(address);
          }, 100);
        }
      };

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload();
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [walletState.address]);

  const fetchBalances = useCallback(async (address: string) => {
    setBalanceState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Try to get provider from Web3Service if not available in state
      let provider = walletState.provider;
      
      if (!provider) {
        // Try to initialize provider from MetaMask
        const ethereumProvider = await (await import('@metamask/detect-provider')).default();
        if (ethereumProvider) {
          provider = new (await import('ethers')).BrowserProvider(ethereumProvider as any);
          // Update state with the new provider
          setWalletState(prev => ({ ...prev, provider }));
        }
      }
      
      if (!provider) {
        throw new Error('Provider not available. Please reconnect your wallet.');
      }
      
      const [ethBalance, usdtBalance] = await Promise.all([
        web3Service.getETHBalance(address, provider),
        web3Service.getUSDTBalance(address, provider),
      ]);

      setBalanceState({
        ethBalance,
        usdtBalance,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setBalanceState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balances',
      }));
    }
  }, [walletState.provider]);

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    setBalanceState(prev => ({ ...prev, error: null }));

    try {
      const newWalletState = await web3Service.connectWallet();
      setWalletState(newWalletState);

      // Only fetch balances if we have a valid provider and address
      if (newWalletState.address && newWalletState.provider) {
        // Small delay to ensure provider is fully initialized
        setTimeout(async () => {
          await fetchBalances(newWalletState.address!);
        }, 100);
      }
    } catch (error) {
      setBalanceState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting, fetchBalances]);

  const disconnectWallet = useCallback(async () => {
    try {
      await web3Service.disconnectWallet();
      setWalletState({
        isConnected: false,
        address: null,
        provider: null,
        signer: null,
      });
      setBalanceState({
        ethBalance: '0',
        usdtBalance: '0',
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }, []);

  const refreshBalances = useCallback(async () => {
    if (walletState.address) {
      await fetchBalances(walletState.address);
    }
  }, [walletState.address, fetchBalances]);

  return {
    walletState,
    balanceState,
    isConnecting,
    connectWallet,
    disconnectWallet,
    refreshBalances,
  };
}
