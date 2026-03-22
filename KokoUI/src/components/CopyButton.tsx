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
      className="rounded-lg border border-[#6F4E37]/50 bg-[#FFF7EF] px-2.5 py-1 text-xs font-medium text-[#4B2E2B] transition hover:bg-[#FED8B1]/45 dark:border-[#ECB176]/40 dark:bg-[#3F2B1E] dark:text-[#FED8B1] dark:hover:bg-[#6F4E37]/60"
      onClick={onCopy}
      title="Copy value"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
