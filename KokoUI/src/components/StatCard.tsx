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
      className="rounded-2xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-5 shadow-sm transition hover:shadow-md dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#4B2E2B] dark:text-[#ECB176]">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#4B2E2B] dark:text-[#FED8B1]">
            {animatedValue.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
            {suffix}
          </p>
          <p className="mt-1 text-xs text-[#4B2E2B] dark:text-[#ECB176]">{subtitle}</p>
        </div>
        <span className="rounded-xl bg-[#FED8B1]/55 p-2.5 text-[#4B2E2B] dark:bg-[#6F4E37]/50 dark:text-[#FED8B1]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </motion.article>
  )
}
