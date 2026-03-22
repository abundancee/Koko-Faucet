export function shortenAddress(address: string, leading = 6, trailing = 4): string {
  if (!address) {
    return '-'
  }

  if (address.length <= leading + trailing) {
    return address
  }

  return `${address.slice(0, leading)}...${address.slice(-trailing)}`
}

export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = Math.max(0, now - timestamp)

  if (diff < 60) {
    return `${diff}s ago`
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`
  }

  return `${Math.floor(diff / 86400)}d ago`
}

export function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) {
    return 'Ready to claim'
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export function formatRetryCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) {
    return 'Ready to claim now'
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `Retry in ${hours}h ${minutes}m ${seconds}s`
}

export function formatTimestamp(timestamp: number): string {
  if (!timestamp) {
    return '--'
  }

  return new Date(timestamp * 1000).toLocaleString()
}
