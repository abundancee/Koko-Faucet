import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { shortenAddress } from '../utils/format'
import { Button } from './Button'

interface WalletConnectButtonProps {
  className?: string
  fullWidth?: boolean
  variant?: 'primary' | 'soft' | 'ghost'
}

export function WalletConnectButton({ className = '', fullWidth = false, variant = 'soft' }: WalletConnectButtonProps) {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  const label = isConnected && address ? shortenAddress(address, 8, 6) : 'Connect Wallet'

  async function handleOpen() {
    await open()
  }

  return (
    <Button variant={variant} fullWidth={fullWidth} className={className} onClick={handleOpen}>
      {label}
    </Button>
  )
}
