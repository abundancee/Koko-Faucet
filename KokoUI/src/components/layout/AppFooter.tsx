import { Github, Globe, BookOpenText } from 'lucide-react'

export function AppFooter() {
  return (
    <footer className="mt-10 rounded-3xl border border-border-muted bg-bg-card px-6 py-8 shadow-sm transition-colors duration-300">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <img src="/koko-logo.png" alt="Koko logo" className="h-8 w-8 rounded-lg border border-border-muted object-cover" />
            <p className="text-lg font-semibold text-primary">Koko Faucet</p>
          </div>
          <p className="mt-2 max-w-md text-sm text-primary">
            Production-inspired ERC20 faucet experience for developers.
          </p>
          <p className="mt-3 inline-flex items-center gap-1 text-sm text-secondary">
            Built  on Ethereum
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-primary">
          <a href="https://github.com/abundancee/Koko-Faucet" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-accent dark:hover:text-brand-primary">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="https://docs.ethers.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-accent dark:hover:text-brand-primary">
            <BookOpenText className="h-4 w-4" /> Docs
          </a>
          <a href="https://sepolia.etherscan.io" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-accent dark:hover:text-brand-primary">
            <Globe className="h-4 w-4" /> Explorer
          </a>
        </div>
      </div>
    </footer>
  )
}
