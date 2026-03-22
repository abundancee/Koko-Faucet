import { Github, Globe, BookOpenText } from 'lucide-react'

export function AppFooter() {
  return (
    <footer className="mt-10 rounded-3xl border border-[#6F4E37]/45 bg-[#FFF7EF] px-6 py-8 shadow-sm dark:border-[#ECB176]/40 dark:bg-[#3F2B1E]">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <img src="/koko-logo.svg" alt="Koko logo" className="h-8 w-8 rounded-lg border border-[#6F4E37]/25 object-cover" />
            <p className="text-lg font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">Koko Faucet</p>
          </div>
          <p className="mt-2 max-w-md text-sm text-[#4B2E2B] dark:text-[#ECB176]">
            Production-inspired ERC20 faucet experience for developers.
          </p>
          <p className="mt-3 inline-flex items-center gap-1 text-sm text-[#4B2E2B] dark:text-[#ECB176]">
            Built  on Ethereum
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-[#4B2E2B] dark:text-[#ECB176]">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#4B2E2B] dark:hover:text-[#FED8B1]">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="https://docs.ethers.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#4B2E2B] dark:hover:text-[#FED8B1]">
            <BookOpenText className="h-4 w-4" /> Docs
          </a>
          <a href="https://sepolia.etherscan.io" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#4B2E2B] dark:hover:text-[#FED8B1]">
            <Globe className="h-4 w-4" /> Explorer
          </a>
        </div>
      </div>
    </footer>
  )
}
