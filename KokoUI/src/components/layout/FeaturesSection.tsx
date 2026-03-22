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
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#4B2E2B] dark:text-[#ECB176]">Features</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">Built for modern web3 teams</h2>
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
              className="rounded-3xl border border-[#6F4E37]/45 bg-[#FFF7EF] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]"
            >
              <span className="inline-flex rounded-xl bg-[#FED8B1]/55 p-2 text-[#4B2E2B] dark:bg-[#6F4E37]/50 dark:text-[#FED8B1]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B2E2B] dark:text-[#ECB176]">{item.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
