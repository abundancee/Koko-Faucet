import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'
import { appConfig } from '../utils/env'

const configuredChain = defineChain({
  id: appConfig.chainId,
  name: appConfig.chainName,
  nativeCurrency: {
    name: appConfig.chainName,
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [appConfig.rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: appConfig.explorerUrl,
    },
  },
})

const wagmiNetworks = [configuredChain]
const appKitNetworks: [typeof configuredChain] = [configuredChain]

const wagmiAdapter = new WagmiAdapter({
  projectId: appConfig.walletConnectProjectId,
  networks: wagmiNetworks,
  ssr: false,
})

createAppKit({
  adapters: [wagmiAdapter],
  projectId: appConfig.walletConnectProjectId,
  networks: appKitNetworks,
  defaultNetwork: configuredChain,
  metadata: {
    name: 'Koko Faucet',
    description: 'Koko ERC20 Faucet Frontend',
    url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
    icons: [],
  },

})

export const wagmiConfig = wagmiAdapter.wagmiConfig
