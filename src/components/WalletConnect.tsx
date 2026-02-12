'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/components/ui/Toast';
import { Sparkles, TrendingUp, Shield, Zap, Wallet, RefreshCw, Copy, ExternalLink } from 'lucide-react';

export function WalletConnect() {
  const { walletState, balanceState, isConnecting, connectWallet, disconnectWallet, refreshBalances } = useWallet();
  const { addToast, ToastContainer } = useToast();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      addToast('Address copied to clipboard!', 'success');
    } catch (error) {
      console.error('Failed to copy address:', error);
      addToast('Failed to copy address', 'error');
    }
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
      addToast('Wallet connected successfully!', 'success');
    } catch (error) {
      addToast('Failed to connect wallet', 'error');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      addToast('Wallet disconnected', 'info');
    } catch (error) {
      addToast('Failed to disconnect wallet', 'error');
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshBalances();
      addToast('Balances refreshed!', 'success');
    } catch (error) {
      addToast('Failed to refresh balances', 'error');
    }
  };

  const openEtherscan = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
    addToast('Opening Etherscan...', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Wallet className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  GetBlock Web3 Wallet
                </h1>
                <p className="text-lg text-gray-600">
                  Professional Wallet Interface
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="font-medium">Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Fast</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Real-time</span>
            </div>
          </div>
        </header>

        {!walletState.isConnected ? (
          /* Enhanced Not Connected State */
          <div className="max-w-lg mx-auto">
            <AnimatedCard glow className="border-0 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Sparkles className="w-14 h-14 text-white" />
                </div>
                <CardTitle className="text-3xl text-gray-900 mb-3">
                  Connect Your Wallet
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Enter the world of DeFi with MetaMask
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button
                  onClick={handleConnect}
                  loading={isConnecting}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </Button>
                
                {balanceState.error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{balanceState.error}</p>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">Real-time</p>
                    <p className="text-sm text-gray-600">Balance updates</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition-colors">
                    <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">Secure</p>
                    <p className="text-sm text-gray-600">Non-custodial</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 mb-3">
                    Don't have MetaMask?
                  </p>
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Download MetaMask
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        ) : (
          /* Enhanced Connected State */
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Wallet Info Card */}
            <AnimatedCard hover={false} className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Wallet Connected</CardTitle>
                      <CardDescription className="text-gray-600">
                        Ethereum Mainnet
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDisconnect}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Disconnect
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-2">Your Address</p>
                      <p className="font-mono text-lg text-gray-900 mb-3">
                        {formatAddress(walletState.address!)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyAddress(walletState.address!)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEtherscan(walletState.address!)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Etherscan
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleRefresh}
                      disabled={balanceState.isLoading}
                      className="ml-4"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${balanceState.isLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedCard glow className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Ethereum</h3>
                        <p className="text-sm text-gray-500">ETH</p>
                      </div>
                    </div>
                  </div>
                  {balanceState.isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-10 w-32 bg-gray-200 rounded-lg mb-2" />
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {parseFloat(balanceState.ethBalance).toFixed(4)}
                      </p>
                      <p className="text-sm text-gray-500">ETH Balance</p>
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>

              <AnimatedCard glow className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Tether</h3>
                        <p className="text-sm text-gray-500">USDT</p>
                      </div>
                    </div>
                  </div>
                  {balanceState.isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-10 w-32 bg-gray-200 rounded-lg mb-2" />
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {parseFloat(balanceState.usdtBalance).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">USDT Balance</p>
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Error Display */}
            {balanceState.error && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600">{balanceState.error}</p>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Footer */}
        <footer className="text-center mt-20">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <a href="https://getblock.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              GetBlock.io
            </a>
            <span className="text-gray-300">•</span>
            <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Ethereum Mainnet
            </a>
            <span className="text-gray-300">•</span>
            <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              MetaMask
            </a>
          </div>
          <p className="text-gray-500 mb-2">
            Built with ❤️ by Brijesh Vadaliya
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-400">Junior Frontend Engineer</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">GetBlock.io</span>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
}
