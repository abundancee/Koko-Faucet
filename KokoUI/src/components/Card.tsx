import type { PropsWithChildren } from 'react'

interface CardProps {
  className?: string
}

export function Card({ children, className = '' }: PropsWithChildren<CardProps>) {
  return <section className={`glass-card rounded-2xl p-5 sm:p-6 ${className}`.trim()}>{children}</section>
}
