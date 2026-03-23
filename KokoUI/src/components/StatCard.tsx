import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'

interface StatCardProps {
  title: string
  value: number
  subtitle: string
  icon: LucideIcon
  suffix?: string
  decimals?: number
}

export function StatCard({ title, value, subtitle, icon: Icon, suffix = '', decimals = 0 }: StatCardProps) {
  const animatedValue = useCountUp(value, { decimals })

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-muted bg-card text-card-foreground p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-secondary">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-primary">
            {animatedValue.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
            {suffix}
          </p>
          <p className="mt-1 text-xs text-secondary">{subtitle}</p>
        </div>
        <span className="rounded-xl bg-brand-secondary/55 p-2.5 text-brand-accent dark:bg-brand-accent/50 dark:text-brand-secondary">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </motion.article>
  )
}
