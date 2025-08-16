// src/lib/wagmi.ts

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'

// Custom definition for Polygon Amoy testnet
export const polygonAmoy = {
  id: 80002,
  name: 'Polygon Amoy Testnet',
  network: 'amoy',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
    public: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
  },
  blockExplorers: {
    default: { name: 'Amoy Explorer', url: 'https://amoy.polygonscan.com/' },
  },
  testnet: true,
}

// Your RainbowKit/Wagmi config
export const config = getDefaultConfig({
  appName: 'MintMoments',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your WalletConnect project ID!
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(polygonAmoy.rpcUrls.default.http[0]),
  },
})
