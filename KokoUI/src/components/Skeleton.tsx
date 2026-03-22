interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`h-16 animate-pulse rounded-xl border border-white/10 bg-white/10 ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
