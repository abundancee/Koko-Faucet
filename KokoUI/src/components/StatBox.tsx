interface StatBoxProps {
  label: string
  value: string
  hint?: string
}

export function StatBox({ label, value, hint }: StatBoxProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-zinc-100">{value}</p>
      {hint ? <p className="mt-1 text-xs text-zinc-400">{hint}</p> : null}
    </article>
  )
}
