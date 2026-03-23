import type { PropsWithChildren } from 'react'

interface CardProps {
  className?: string
}

export function Card({ children, className = '' }: PropsWithChildren<CardProps>) {
  return <section className={`rounded-2xl p-5 sm:p-6 bg-card text-card-foreground border border-muted shadow-md transition-colors duration-300 ${className}`.trim()}>{children}</section>
}
