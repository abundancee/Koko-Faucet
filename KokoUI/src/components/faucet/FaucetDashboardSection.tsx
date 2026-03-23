import { motion } from 'framer-motion'
import { Coins, Database, Droplets, ShieldCheck, Wallet } from 'lucide-react'
import type { FormEvent } from 'react'
import type { FaucetData, TxStatus } from '../../types/faucet'
import { shortenAddress } from '../../utils/format'
import { Button } from '../Button'
import { Card } from '../Card'
import { CountdownDisplay } from '../CountdownDisplay'
import { Skeleton } from '../Skeleton'
import { StatCard } from '../StatCard'
import { TransactionItem } from '../TransactionItem'

interface FaucetDashboardSectionProps {
  faucetData?: FaucetData
  isLoading: boolean
  isFetching: boolean
  status: TxStatus
  countdownSeconds: number
  claimDisabledReason: string
  onClaim: (event: FormEvent) => Promise<void>
  onAddToken: () => Promise<void>
  onTransfer: (event: FormEvent) => Promise<void>
  onMint: (event: FormEvent) => Promise<void>
  transferRecipient: string
  setTransferRecipient: (value: string) => void
  transferAmount: string
  setTransferAmount: (value: string) => void
  mintRecipient: string
  setMintRecipient: (value: string) => void
  mintAmount: string
  setMintAmount: (value: string) => void
  address?: string
  isConnected: boolean
  isOwner: boolean
  isWrongNetwork: boolean
  isAddingToken: boolean
  eligibilityText: string
  transferStatus: TxStatus
  mintStatus: TxStatus
  transferHash: string
  mintHash: string
  transferError: string
  mintError: string
  isError: boolean
  runtimeError?: string
  hasValidContractAddress: boolean
  explorerUrl: string
}

const transition = { duration: 0.25 }

export function FaucetDashboardSection({
  faucetData,
  isLoading,
  isFetching,
  status,
  countdownSeconds,
  claimDisabledReason,
  onClaim,
  onAddToken,
  onTransfer,
  onMint,
  transferRecipient,
  setTransferRecipient,
  transferAmount,
  setTransferAmount,
  mintRecipient,
  setMintRecipient,
  mintAmount,
  setMintAmount,
  address,
  isConnected,
  isOwner,
  isWrongNetwork,
  isAddingToken,
  eligibilityText,
  transferStatus,
  mintStatus,
  transferHash,
  mintHash,
  transferError,
  mintError,
  isError,
  runtimeError,
  hasValidContractAddress,
  explorerUrl,
}: FaucetDashboardSectionProps) {
  const stats = faucetData
    ? [
        {
          title: 'Total Distributed',
          value: Number.parseFloat(faucetData.stats.totalDistributed || '0'),
          subtitle: 'Tokens emitted by faucet',
          icon: Coins,
          suffix: ` ${faucetData.tokenSymbol}`,
          decimals: 2,
        },
        {
          title: 'Total Supply',
          value: Number.parseFloat(faucetData.totalSupplyFormatted || '0'),
          subtitle: 'Current token supply',
          icon: Database,
          suffix: ` ${faucetData.tokenSymbol}`,
          decimals: 2,
        },
        {
          title: 'Total Claims',
          value: faucetData.stats.totalClaims,
          subtitle: 'All-time claim transactions',
          icon: Droplets,
          decimals: 0,
        },
        {
          title: 'Your Claims',
          value: faucetData.stats.userClaims,
          subtitle: 'Claims from connected wallet',
          icon: Wallet,
          decimals: 0,
        },
      ]
    : []

  return (
    <section id="faucet-dashboard" className="mt-9">
      <div className="mb-4">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-secondary">Dashboard</p>
        <h2 className="mt-1 text-2xl font-semibold text-primary">Main Faucet Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="xl:col-span-2">
          <Card>
            <p className="text-xs uppercase tracking-[0.2em] text-secondary">Faucet Card</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-primary">
              {faucetData?.tokenName ?? 'ERC20 Faucet'}
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-muted bg-card text-card-foreground px-4 py-3">
                <p className="text-xs text-secondary">Total Supply</p>
                <p className="mt-1 text-lg font-semibold text-primary">{faucetData?.totalSupplyFormatted ?? '--'} {faucetData?.tokenSymbol ?? ''}</p>
              </div>
              <div className="rounded-2xl border border-muted bg-card text-card-foreground px-4 py-3">
                <p className="text-xs text-secondary">Claim Amount</p>
                <p className="mt-1 text-lg font-semibold text-primary">{faucetData?.claimAmountFormatted ?? '--'} {faucetData?.tokenSymbol ?? ''}</p>
              </div>
              <div className="rounded-2xl border border-muted bg-card text-card-foreground px-4 py-3">
                <p className="text-xs text-secondary">Your Balance</p>
                <p className="mt-1 text-lg font-semibold text-primary">{faucetData?.userBalanceFormatted ?? '--'} {faucetData?.tokenSymbol ?? ''}</p>
              </div>
            </div>

            <form onSubmit={onClaim} className="mt-5 space-y-3">
              <Button type="submit" fullWidth variant="soft" isLoading={status === 'pending'} disabled={Boolean(claimDisabledReason)}>
                {status === 'pending' ? 'Claiming...' : 'Claim Tokens'}
              </Button>
              {claimDisabledReason && claimDisabledReason !== 'Cooldown active' ? <p className="text-sm text-secondary">{claimDisabledReason}</p> : null}
            </form>
          </Card>

          <div className="mt-25">
            <Button
              type="button"
              variant="ghost"
              className="border border-accent bg-transparent px-4 py-2 text-accent hover:bg-accent-soft hover:text-white dark:border-accent dark:bg-transparent dark:text-accent dark:hover:bg-accent-soft dark:hover:text-white"
              isLoading={isAddingToken}
              onClick={onAddToken}
              disabled={!isConnected || isWrongNetwork || !hasValidContractAddress}
            >
              <Wallet className="h-4 w-4" />
              {isAddingToken ? 'Adding network...' : 'Add KO to wallet'}
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
          <Card>
            <h3 className="text-lg font-semibold text-primary">User Panel</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-muted bg-card text-card-foreground p-3">
                <p className="text-xs text-secondary">Connected wallet</p>
                <p className="mt-1 text-sm font-semibold text-primary">{address ? shortenAddress(address, 8, 6) : 'Not connected'}</p>
              </div>
              <div className="rounded-xl border border-muted bg-card text-card-foreground p-3">
                <p className="text-xs text-secondary">Claim eligibility</p>
                <p className="mt-1 text-sm font-semibold text-primary">{eligibilityText}</p>
              </div>
              <div className="rounded-xl border border-muted bg-card text-card-foreground p-3">
                <p className="text-xs text-secondary">Network</p>
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary"><ShieldCheck className="h-4 w-4 text-secondary" /> {faucetData?.networkName ?? '--'}</p>
              </div>
              <div className="rounded-xl border border-muted bg-card text-card-foreground p-3">
                <p className="text-xs text-secondary">Next claim countdown</p>
                <CountdownDisplay totalSeconds={countdownSeconds} label="Next claim" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <form onSubmit={onTransfer} className="space-y-3">
            <p className="text-sm font-semibold text-[#4B2E2B] text-xl font-semibold text-primary">Transfer Tokens</p>
            <input
              type="text"
              className="input-base"
              placeholder="Recipient wallet 0x..."
              value={transferRecipient}
              onChange={(event) => setTransferRecipient(event.target.value)}
            />
            <input
              type="number"
              min="0"
              step="any"
              className="input-base"
              placeholder={`Amount in ${faucetData?.tokenSymbol ?? 'token'}`}
              value={transferAmount}
              onChange={(event) => setTransferAmount(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="soft"
              isLoading={transferStatus === 'pending'}
              disabled={!isConnected || isWrongNetwork || !hasValidContractAddress}
            >
              {transferStatus === 'pending' ? 'Transferring...' : 'Transfer'}
            </Button>
            {transferError ? <p className="text-xs text-[#4B2E2B] dark:text-[#FED8B1]">{transferError}</p> : null}
            {transferHash ? (
              <a href={`${explorerUrl}/tx/${transferHash}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#4B2E2B] hover:underline font-semibold text-primary">
                View transfer transaction: {shortenAddress(transferHash, 10, 8)}
              </a>
            ) : null}
          </form>
        </Card>

        <Card>
          <form onSubmit={onMint} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#4B2E2B] text-xl font-semibold text-primary">Mint Tokens</p>
            </div>
            <input
              type="text"
              className="input-base"
              placeholder="Recipient wallet 0x..."
              value={mintRecipient}
              onChange={(event) => setMintRecipient(event.target.value)}
            />
            <input
              type="number"
              min="0"
              step="any"
              className="input-base"
              placeholder={`Amount in ${faucetData?.tokenSymbol ?? 'token'}`}
              value={mintAmount}
              onChange={(event) => setMintAmount(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="soft"
              isLoading={mintStatus === 'pending'}
              disabled={!isConnected || isWrongNetwork || !isOwner || !hasValidContractAddress}
            >
              {mintStatus === 'pending' ? 'Minting...' : 'Mint'}
            </Button>
             {mintError ? <p className="text-xs text-[#4B2E2B] dark:text-[#FED8B1]">{mintError}</p> : null}
            {mintHash ? (
              <a href={`${explorerUrl}/tx/${mintHash}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#4B2E2B] hover:underline font-semibold text-primary">
                View mint transaction: {shortenAddress(mintHash, 10, 8)}
              </a>
            ) : null}

          </form>
        </Card>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary">Stats</h3>
          {isFetching ? <span className="rounded-full border border-[#6F4E37]/50 bg-[#FED8B1]/45 px-3 py-1 text-xs text-[#4B2E2B] dark:border-[#ECB176]/45 dark:bg-[#6F4E37]/50 dark:text-[#FED8B1]">Refreshing</span> : null}
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.title} title={item.title} value={item.value} subtitle={item.subtitle} icon={item.icon} suffix={item.suffix} decimals={item.decimals} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-6">
        <Card>
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-semibold text-primary">Recent Transactions</h3>
            <p className="text-sm font-semibold text-primary">Live feed</p>
          </div>
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : faucetData?.recentTransactions.length ? (
            <div className="flex flex-col gap-3">
              {faucetData.recentTransactions.map((item) => (
                <TransactionItem key={item.hash} item={item} explorerBaseUrl={faucetData.explorerBaseUrl} tokenSymbol={faucetData.tokenSymbol} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#4B2E2B] dark:text-[#ECB176]">No claim transactions found in the scanned block range.</p>
          )}
        </Card>
      </section>

      {isError ? <p className="mt-5 rounded-xl border border-muted bg-card text-card-foreground px-4 py-3 text-sm">{runtimeError}</p> : null}
      {!hasValidContractAddress ? <p className="mt-5 rounded-xl border border-muted bg-card text-card-foreground px-4 py-3 text-sm">Set VITE_CONTRACT_ADDRESS (or CONTRACT_ADDRESS) to a valid contract value.</p> : null}
      {!isConnected ? <p className="mt-5 rounded-xl border border-muted bg-card text-card-foreground px-4 py-3 text-sm">Connect wallet to enable claiming and personalized metrics.</p> : null}
    </section>
  )
}
