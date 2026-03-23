import { motion } from 'framer-motion'
import { Bolt, CircleCheckBig, ShieldCheck, Wallet } from 'lucide-react'

const features = [
  {
    title: 'Instant Claims',
    description: 'Claim test tokens in seconds with wallet-first UX and clear cooldown state.',
    icon: Bolt,
  },
  {
    title: 'Secure & On-Chain',
    description: 'All state comes from smart contracts and public transactions.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparent Distribution',
    description: 'Track real stats and recent claims from your faucet activity feed.',
    icon: CircleCheckBig,
  },
  {
    title: 'No Signup Required',
    description: 'No forms or accounts. Connect wallet, claim, and continue building.',
    icon: Wallet,
  },
]

export function FeaturesSection() {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-secondary">Features</p>
        <h2 className="mt-1 text-2xl font-semibold text-primary">Built for modern web3 teams</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="rounded-3xl border border-border-muted bg-bg-card p-5 shadow-sm transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex rounded-xl bg-brand-secondary/55 p-2 text-brand-accent dark:bg-brand-accent/50 dark:text-brand-secondary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{item.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
