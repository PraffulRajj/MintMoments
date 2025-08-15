import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'MintMoments',
  projectId: '0xea8c4eca7b54cae19C215C8fB34684415475463f', // Replace this with your actual WalletConnect project ID
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http('https://rpc.ankr.com/polygon_mumbai')
  },
})
