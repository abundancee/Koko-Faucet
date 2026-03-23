import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '../Button.tsx'
import { WalletConnectButton } from '../WalletConnectButton'
import type { FaucetData } from '../../types/faucet'

interface HeroSectionProps {
  onClaimClick: () => void
  faucetData?: FaucetData
}

export function HeroSection({ onClaimClick, faucetData }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border-muted bg-bg-card/85 px-6 py-16 shadow-sm backdrop-blur-sm transition-colors duration-300 sm:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/35 blur-3xl dark:bg-brand-accent/35" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-brand-secondary/45 blur-3xl dark:bg-brand-accent/35" />

      <div className="relative grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-accent/50 bg-brand-secondary/45 px-3 py-1 text-xs font-medium text-brand-accent dark:border-brand-primary/45 dark:bg-brand-accent/50 dark:text-brand-secondary">
            <Zap className="h-3.5 w-3.5" /> 
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Claim KO Instantly
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary">
            Connect your wallet, claim in one click, and track transparent token distribution in real time.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <WalletConnectButton />
            <Button onClick={onClaimClick} className="group">
              Claim Tokens
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-3xl border border-border-muted bg-bg-card p-5 shadow-lg transition-colors duration-300"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-primary">Dashboard Snapshot</p>
            <span className="rounded-full bg-brand-secondary/70 px-2 py-0.5 text-xs font-medium text-brand-accent dark:bg-brand-accent/35 dark:text-brand-secondary">
              Live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-muted bg-card text-card-foreground p-3">
              <p className="text-xs text-secondary">Claims Today</p>
              <p className="mt-1 text-xl font-semibold text-primary">{faucetData?.stats.claimsToday ?? '--'}</p>
            </div>
            <div className="rounded-2xl border border-muted bg-card text-card-foreground p-3">
              <p className="text-xs text-secondary">Active Wallets</p>
              <p className="mt-1 text-xl font-semibold text-primary">{faucetData?.stats.uniqueUsers ?? '--'}</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded-full bg-[#FED8B1]/55 dark:bg-[#6F4E37]/60" />
            <div className="h-3 w-10/12 rounded-full bg-[#FED8B1]/55 dark:bg-[#6F4E37]/60" />
            <div className="h-3 w-8/12 rounded-full bg-[#FED8B1]/55 dark:bg-[#6F4E37]/60" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
