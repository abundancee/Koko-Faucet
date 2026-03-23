interface StatBoxProps {
  label: string
  value: string
  hint?: string
}

export function StatBox({ label, value, hint }: StatBoxProps) {
  return (
    <article className="rounded-xl border border-muted bg-card text-card-foreground p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-secondary">{label}</p>
      <p className="mt-2 text-lg font-semibold text-primary">{value}</p>
      {hint ? <p className="mt-1 text-xs text-secondary">{hint}</p> : null}
    </article>
  )
}
