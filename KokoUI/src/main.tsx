import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { Toaster } from 'react-hot-toast'
import './styles/globals.css'
import App from './App.tsx'
import { wagmiConfig } from './config/web3'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3600,
            style: {
              background: '#fff7ef',
              color: '#3f2b1e',
              border: '1px solid rgba(166, 123, 91, 0.35)',
              boxShadow: '0 14px 36px rgba(111, 78, 55, 0.16)',
            },
          }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
