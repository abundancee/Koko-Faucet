export type TxStatus = 'idle' | 'pending' | 'success' | 'error'

export interface RecentTransaction {
  wallet: string
  amount: string
  timestamp: number
  hash: string
  type?: 'claim' | 'mint' | 'transfer'
  from?: string
  to?: string
}

export interface FaucetStats {
  totalDistributed: string
  uniqueUsers: number
  claimsToday: number
  totalClaims: number
  userClaims: number
  faucetBalance: string
}

export interface FaucetData {
  tokenName: string
  tokenSymbol: string
  tokenDecimals: number
  totalSupplyRaw: bigint
  maxSupplyRaw: bigint
  totalSupplyFormatted: string
  maxSupplyFormatted: string
  remainingMintableFormatted: string
  ownerAddress: string
  userBalanceFormatted: string
  claimAmountRaw: bigint
  claimAmountFormatted: string
  claimInterval: number
  lastClaimTime: number
  nextClaimTime: number
  faucetBalanceFormatted: string
  networkName: string
  explorerBaseUrl: string
  stats: FaucetStats
  recentTransactions: RecentTransaction[]
}
