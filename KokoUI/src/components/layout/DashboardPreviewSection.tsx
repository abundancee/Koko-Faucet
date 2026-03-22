import { motion } from 'framer-motion'
import { Eye, Shield } from 'lucide-react'
import type { FaucetData } from '../../types/faucet'
import { shortenAddress } from '../../utils/format'
import { Button } from '../Button'
import { Card } from '../Card'
import { WalletConnectButton } from '../WalletConnectButton'

interface DashboardPreviewSectionProps {
  faucetData?: FaucetData
  isConnected: boolean
}

export function DashboardPreviewSection({ faucetData, isConnected }: DashboardPreviewSectionProps) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#4B2E2B] dark:text-[#ECB176]">Preview</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">Dashboard snapshot</h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#6F4E37]/45 bg-[#FFF7EF] px-3 py-1 text-xs text-[#4B2E2B] dark:border-[#ECB176]/40 dark:bg-[#3F2B1E] dark:text-[#ECB176]">
          <Eye className="h-3.5 w-3.5" /> Preview mode
        </span>
      </div>

      <Card className="relative overflow-hidden">
        <div className={`space-y-4 transition ${isConnected ? '' : 'blur-sm'}`}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-3 dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]">
              <p className="text-xs text-[#4B2E2B] dark:text-[#ECB176]">Token</p>
              <p className="mt-1 text-base font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">{faucetData?.tokenSymbol ?? '--'}</p>
            </div>
            <div className="rounded-2xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-3 dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]">
              <p className="text-xs text-[#4B2E2B] dark:text-[#ECB176]">Claim Amount</p>
              <p className="mt-1 text-base font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">{faucetData?.claimAmountFormatted ?? '--'}</p>
            </div>
            <div className="rounded-2xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-3 dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]">
              <p className="text-xs text-[#4B2E2B] dark:text-[#ECB176]">Faucet Balance</p>
              <p className="mt-1 text-base font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">{faucetData?.faucetBalanceFormatted ?? '--'}</p>
            </div>
            <div className="rounded-2xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-3 dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]">
              <p className="text-xs text-[#4B2E2B] dark:text-[#ECB176]">Total Claims</p>
              <p className="mt-1 text-base font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">{faucetData?.stats.totalClaims ?? '--'}</p>
            </div>
          </div>

          <div className="space-y-2">
            {faucetData?.recentTransactions.slice(0, 3).map((item) => (
              <div key={item.hash} className="flex items-center justify-between rounded-xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-3 text-sm dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]">
                <span className="font-medium text-[#4B2E2B] dark:text-[#FED8B1]">{shortenAddress(item.wallet)}</span>
                <span className="text-[#4B2E2B] dark:text-[#ECB176]">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#FFF7EF]/75 backdrop-blur-sm dark:bg-[#1B140F]/75"
          >
            <Shield className="h-6 w-6 text-[#4B2E2B] dark:text-[#FED8B1]" />
            <p className="text-sm font-medium text-[#4B2E2B] dark:text-[#FED8B1]">Connect wallet to unlock full preview</p>
            <WalletConnectButton />
            <Button variant="soft">No signup required</Button>
          </motion.div>
        ) : null}
      </Card>
    </section>
  )
}
