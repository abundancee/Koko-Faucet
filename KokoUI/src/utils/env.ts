const fallbackContractAddress = import.meta.env.CONTRACT_ADDRESS as string | undefined

export const appConfig = {
  rpcUrl: (import.meta.env.VITE_RPC_URL as string | undefined) ?? '',
  contractAddress:
    (import.meta.env.VITE_CONTRACT_ADDRESS as string | undefined) ?? fallbackContractAddress ?? '',
  walletConnectProjectId:
    (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined) ?? 'demo',
  chainId: Number.parseInt((import.meta.env.VITE_CHAIN_ID as string | undefined) ?? '11155111', 10),
  chainName: (import.meta.env.VITE_CHAIN_NAME as string | undefined) ?? 'Sepolia',
  explorerUrl:
    (import.meta.env.VITE_EXPLORER_URL as string | undefined) ?? 'https://sepolia.etherscan.io',
}

export const hasValidContractAddress = /^0x[a-fA-F0-9]{40}$/.test(appConfig.contractAddress)
