import { useState } from 'react'

interface CopyButtonProps {
  value: string
}

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    if (!value) {
      return
    }

    await navigator.clipboard.writeText(value)
    setCopied(true)

    window.setTimeout(() => {
      setCopied(false)
    }, 1200)
  }

  return (
    <button
      type="button"
      className="rounded-lg border border-muted bg-card text-card-foreground px-2.5 py-1 text-xs font-medium transition hover:bg-accent-soft hover:text-white"
      onClick={onCopy}
      title="Copy value"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
