import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { config } from './lib/wagmi'

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#10B981',
          accentColorForeground: 'black',
          borderRadius: 'large',
        })}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
