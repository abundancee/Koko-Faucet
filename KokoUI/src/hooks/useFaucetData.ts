import { useQuery } from '@tanstack/react-query'
import { EventLog, formatUnits } from 'ethers'
import { useAccount, useChainId } from 'wagmi'
import { type FaucetData, type RecentTransaction } from '../types/faucet'
import { getReadContract, getRpcProvider } from '../utils/ethers'
import { appConfig, hasValidContractAddress } from '../utils/env'

const RECENT_EVENT_WINDOW = 40000
const RECENT_TRANSACTIONS_LIMIT = 8

export function useFaucetData() {
  const { address } = useAccount()
  const activeChainId = useChainId()

  return useQuery<FaucetData>({
    queryKey: ['faucet-data', address, activeChainId],
    queryFn: async () => {
      if (!hasValidContractAddress) {
        throw new Error('Invalid or missing faucet contract address in environment.')
      }

      const provider = getRpcProvider()
      const contract = getReadContract()

      // These are the core on-chain reads the UI depends on.
      const [
        tokenName,
        tokenSymbol,
        tokenDecimalsRaw,
        totalSupplyRaw,
        maxSupplyRaw,
        ownerAddress,
        claimAmountRaw,
        claimIntervalRaw,
        lastClaimRaw,
        faucetBalanceRaw,
        userBalanceRaw,
      ] =
        await Promise.all([
          contract.name() as Promise<string>,
          contract.symbol() as Promise<string>,
          contract.decimals() as Promise<number>,
          contract.totalSupply() as Promise<bigint>,
          contract.MAX_SUPPLY() as Promise<bigint>,
          contract.owner() as Promise<string>,
          contract.CLAIM_AMOUNT() as Promise<bigint>,
          contract.CLAIM_INTERVAL() as Promise<bigint>,
          address
            ? (contract.lastClaimTime(address) as Promise<bigint>)
            : Promise.resolve<bigint>(BigInt(0)),
          contract.balanceOf(appConfig.contractAddress) as Promise<bigint>,
          address ? (contract.balanceOf(address) as Promise<bigint>) : Promise.resolve<bigint>(BigInt(0)),
        ])

      const tokenDecimals = Number(tokenDecimalsRaw)
      const claimInterval = Number(claimIntervalRaw)
      const lastClaimTime = Number(lastClaimRaw)
      const nextClaimTime = lastClaimTime + claimInterval
      const remainingMintableRaw = maxSupplyRaw > totalSupplyRaw ? maxSupplyRaw - totalSupplyRaw : BigInt(0)


      // Fetch all relevant events: Claims, Mint, Transfer
      let claimEvents: EventLog[] = []
      let mintEvents: EventLog[] = []
      let transferEvents: EventLog[] = []
      try {
        const latestBlock = await provider.getBlockNumber()
        const fromBlock = Math.max(0, latestBlock - RECENT_EVENT_WINDOW)
        // Claims
        const claimsFilter = contract.filters.TokensClaimed()
        const claimLogs = await contract.queryFilter(claimsFilter, fromBlock, latestBlock)
        claimEvents = claimLogs.filter((event): event is EventLog => event instanceof EventLog)
        // Mint
        const mintFilter = contract.filters.TokensMinted?.() ?? contract.filters.Transfer(null, null)
        const mintLogs = contract.filters.TokensMinted ? await contract.queryFilter(mintFilter, fromBlock, latestBlock) : []
        mintEvents = mintLogs.filter((event): event is EventLog => event instanceof EventLog)
        // Transfer
        const transferFilter = contract.filters.Transfer()
        const transferLogs = await contract.queryFilter(transferFilter, fromBlock, latestBlock)
        transferEvents = transferLogs.filter((event): event is EventLog => event instanceof EventLog)
      } catch {
        claimEvents = []
        mintEvents = []
        transferEvents = []
      }

      // Parse all events into a unified transaction feed
      const txRows: Array<{
        type: 'claim' | 'mint' | 'transfer',
        wallet: string,
        amount: bigint,
        hash: string,
        blockNumber: number,
        to?: string,
        from?: string,
      }> = []

      // Claims
      for (const event of claimEvents) {
        const wallet = String(event.args?.[0] ?? '')
        const amountRaw = event.args?.[1]
        const amount = typeof amountRaw === 'bigint' ? amountRaw : claimAmountRaw
        txRows.push({ type: 'claim', wallet, amount, hash: event.transactionHash, blockNumber: event.blockNumber })
      }
      // Mint
      for (const event of mintEvents) {
        const wallet = String(event.args?.[0] ?? '')
        const amountRaw = event.args?.[1]
        const amount = typeof amountRaw === 'bigint' ? amountRaw : claimAmountRaw
        txRows.push({ type: 'mint', wallet, amount, hash: event.transactionHash, blockNumber: event.blockNumber })
      }
      // Transfers (exclude mints and claims to avoid duplicates)
      for (const event of transferEvents) {
        const from = String(event.args?.[0] ?? '')
        const to = String(event.args?.[1] ?? '')
        const amountRaw = event.args?.[2]
        const amount = typeof amountRaw === 'bigint' ? amountRaw : claimAmountRaw
        // Exclude if this transfer is already in claims or mints (by hash)
        if (!txRows.some(row => row.hash === event.transactionHash)) {
          txRows.push({ type: 'transfer', wallet: to, from, to, amount, hash: event.transactionHash, blockNumber: event.blockNumber })
        }
      }

      // Sort by blockNumber descending (most recent first)
      txRows.sort((a, b) => b.blockNumber - a.blockNumber)

      // Only keep the most recent N
      const recentRows = txRows.slice(0, RECENT_TRANSACTIONS_LIMIT)

      // Get block timestamps
      const blockNumbers = Array.from(new Set(recentRows.map((row) => row.blockNumber)))
      const blocks = await Promise.all(blockNumbers.map(async (blockNumber) => provider.getBlock(blockNumber)))
      const blockTimestampMap = new Map<number, number>()
      for (const block of blocks) {
        if (block) {
          blockTimestampMap.set(block.number, block.timestamp)
        }
      }


      // Stats: only count claims for unique users, userClaims, etc.
      const claimRows = claimEvents
        .map((event) => {
          const wallet = String(event.args?.[0] ?? '')
          return { wallet, hash: event.transactionHash, blockNumber: event.blockNumber, amount: event.args?.[1] }
        })
        .filter((row) => row.wallet && row.hash)

      const uniqueUsers = new Set(claimRows.map((row) => row.wallet.toLowerCase())).size
      const userClaims = address
        ? claimRows.filter((row) => row.wallet.toLowerCase() === address.toLowerCase()).length
        : 0

      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      const todayStartSec = Math.floor(todayStart.getTime() / 1000)

      const totalClaims = claimRows.length

      // For claimsToday and totalDistributedRaw, use only claims
      const uniqueClaimBlocks = Array.from(new Set(claimRows.map((row) => row.blockNumber)))
      const allBlocks = await Promise.all(uniqueClaimBlocks.map(async (blockNumber) => provider.getBlock(blockNumber)))
      const allBlockTimestampMap = new Map<number, number>()
      for (const block of allBlocks) {
        if (block) {
          allBlockTimestampMap.set(block.number, block.timestamp)
        }
      }
      let claimsToday = 0
      let totalDistributedRaw = BigInt(0)
      for (const row of claimRows) {
        totalDistributedRaw += typeof row.amount === 'bigint' ? row.amount : claimAmountRaw
        const timestamp = allBlockTimestampMap.get(row.blockNumber) ?? 0
        if (timestamp >= todayStartSec) {
          claimsToday += 1
        }
      }

      // Map all recentRows to RecentTransaction (show type in UI if desired)
      const recentTransactions: RecentTransaction[] = recentRows.map((row) => ({
        wallet: row.wallet,
        amount: formatUnits(row.amount, tokenDecimals),
        timestamp: blockTimestampMap.get(row.blockNumber) ?? 0,
        hash: row.hash,
        // Optionally: type: row.type, from: row.from, to: row.to
      }))

      return {
        tokenName,
        tokenSymbol,
        tokenDecimals,
        totalSupplyRaw,
        maxSupplyRaw,
        totalSupplyFormatted: formatUnits(totalSupplyRaw, tokenDecimals),
        maxSupplyFormatted: formatUnits(maxSupplyRaw, tokenDecimals),
        remainingMintableFormatted: formatUnits(remainingMintableRaw, tokenDecimals),
        ownerAddress,
        userBalanceFormatted: formatUnits(userBalanceRaw, tokenDecimals),
        claimAmountRaw,
        claimAmountFormatted: formatUnits(claimAmountRaw, tokenDecimals),
        claimInterval,
        lastClaimTime,
        nextClaimTime,
        faucetBalanceFormatted: formatUnits(faucetBalanceRaw, tokenDecimals),
        networkName: appConfig.chainName,
        explorerBaseUrl: appConfig.explorerUrl,
        stats: {
          totalDistributed: formatUnits(totalDistributedRaw, tokenDecimals),
          uniqueUsers,
          claimsToday,
          totalClaims,
          userClaims,
          faucetBalance: formatUnits(faucetBalanceRaw, tokenDecimals),
        },
        recentTransactions,
      }
    },
    refetchInterval: 15000,
  })
}
