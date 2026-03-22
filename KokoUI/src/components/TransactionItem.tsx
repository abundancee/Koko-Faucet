import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { CopyButton } from './CopyButton'
import type { RecentTransaction } from '../types/faucet'
import { formatRelativeTime, shortenAddress } from '../utils/format'

interface TransactionItemProps {
  item: RecentTransaction
  explorerBaseUrl: string
  tokenSymbol: string
}

export function TransactionItem({ item, explorerBaseUrl, tokenSymbol }: TransactionItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-between gap-3 rounded-xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-4 shadow-sm transition hover:border-[#A67B5B]/40 hover:shadow-md dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">{shortenAddress(item.wallet)}</p>
          <CopyButton value={item.wallet} />
        </div>
        <p className="text-xs text-[#4B2E2B] dark:text-[#ECB176]">{formatRelativeTime(item.timestamp)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">
          {item.amount} {tokenSymbol}
        </p>
        <a
          href={`${explorerBaseUrl}/tx/${item.hash}`}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-xs text-[#4B2E2B] transition hover:text-[#4B2E2B] dark:text-[#ECB176] dark:hover:text-[#FED8B1]"
          title="Open in explorer"
        >
          {shortenAddress(item.hash, 10, 8)} <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  )
}
