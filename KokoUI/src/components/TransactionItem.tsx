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
      className="flex items-center justify-between gap-3 rounded-xl border border-border-muted bg-bg-card p-4 shadow-sm transition-colors duration-300 hover:border-brand-accent/40 hover:shadow-md"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-primary">{shortenAddress(item.wallet)}</p>
          <CopyButton value={item.wallet} />
          {item.type && (
            <span className="ml-2 rounded bg-brand-secondary/60 px-2 py-0.5 text-xs font-bold uppercase text-brand-accent dark:bg-brand-accent/60 dark:text-brand-secondary">
              {item.type}
            </span>
          )}
        </div>
        <p className="text-xs text-secondary">{formatRelativeTime(item.timestamp)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-primary">
          {item.amount} {tokenSymbol}
        </p>
        <a
          href={`${explorerBaseUrl}/tx/${item.hash}`}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-xs text-secondary transition-colors duration-300 hover:text-brand-accent dark:hover:text-brand-secondary"
          title="Open in explorer"
        >
          {shortenAddress(item.hash, 10, 8)} <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  )
}
