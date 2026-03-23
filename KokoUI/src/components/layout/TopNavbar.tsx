
import { Button } from '../Button'
import { WalletConnectButton } from '../WalletConnectButton'
import { ThemeToggle } from './ThemeToggle'


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
    <nav className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border-muted bg-bg-card px-5 py-4 shadow-md transition-colors duration-300">
      <div className="flex items-center gap-2">
        <img src="/koko-logo.png" alt="Koko logo" className="h-8 w-8 rounded-lg border border-border-muted object-cover" />
        <div>
          <p className="text-sm font-semibold text-brand-secondary">Koko Faucet</p>
          <p className="text-xs text-brand-primary">An ERC20 Test Token Dashboard</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ThemeToggle />
        {isWrongNetwork ? (
          <Button variant="ghost" onClick={onSwitchNetwork} isLoading={isSwitchingNetwork}>
            Switch to {supportedChainName}
          </Button>
        ) : null}
        <WalletConnectButton />
      </div>
    </nav>
  );
}
