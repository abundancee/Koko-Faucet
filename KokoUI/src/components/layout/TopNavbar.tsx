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
        <img src="/koko-logo.svg" alt="Koko logo" className="h-8 w-8 rounded-lg border border-[#6F4E37]/25 object-cover" />
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
