interface CountdownDisplayProps {
  totalSeconds: number
  label: string
}

function segment(value: number) {
  return value.toString().padStart(2, '0')
}

export function CountdownDisplay({ totalSeconds, label }: CountdownDisplayProps) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="rounded-2xl border border-muted bg-card text-card-foreground p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-secondary">{label}</p>
      <div className="mt-2 flex items-center gap-2 text-2xl font-semibold text-primary">
        <span className="countdown-pill">{segment(hours)}</span>
        <span>:</span>
        <span className="countdown-pill">{segment(minutes)}</span>
        <span>:</span>
        <span className="countdown-pill">{segment(seconds)}</span>
      </div>
    </div>
  )
}
