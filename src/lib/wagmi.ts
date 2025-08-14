
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'MintMoments',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // TODO: replace
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http('https://rpc.ankr.com/polygon_mumbai')
  },
})
