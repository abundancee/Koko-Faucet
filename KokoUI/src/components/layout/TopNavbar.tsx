import { Sparkles } from 'lucide-react'
import { Button } from '../Button'
import { WalletConnectButton } from '../WalletConnectButton'

interface TopNavbarProps {
  isWrongNetwork: boolean
  onSwitchNetwork: () => void
  isSwitchingNetwork: boolean
  supportedChainName: string
}

export function TopNavbar({
  isWrongNetwork,
  onSwitchNetwork,
  isSwitchingNetwork,
  supportedChainName,
}: TopNavbarProps) {
  return (
    <nav className="glass-card mb-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl px-5 py-4">
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] p-2 text-[#FFF7EF]">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#4B2E2B] dark:text-[#FED8B1]">Koko Faucet</p>
          <p className="text-xs text-[#4B2E2B] dark:text-[#ECB176]">Modern ERC20 Test Token Dashboard</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isWrongNetwork ? (
          <Button variant="ghost" onClick={onSwitchNetwork} isLoading={isSwitchingNetwork}>
            Switch to {supportedChainName}
          </Button>
        ) : null}
        <WalletConnectButton />
      </div>
    </nav>
  )
}
