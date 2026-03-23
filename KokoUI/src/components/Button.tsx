import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonVariant = 'primary' | 'soft' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  isLoading?: boolean
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const baseClassName =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60'
  const widthClassName = fullWidth ? 'w-full' : ''
  const variantClassName =
    variant === 'primary'
      ? 'bg-card-brown text-card-foreground-brown shadow-lg shadow-accent-soft/25 hover:translate-y-[-1px] hover:brightness-105'
      : variant === 'soft'
        ? 'border border-accent bg-card text-accent shadow-sm hover:bg-accent-soft hover:text-white dark:border-accent dark:bg-card-brown dark:text-card-foreground-brown dark:hover:bg-accent-soft dark:hover:text-white'
        : 'text-accent hover:bg-accent-soft hover:text-white dark:text-card-foreground-brown dark:hover:bg-accent-soft dark:hover:text-white'

  const isDisabled = disabled || isLoading

  return (
    <motion.div whileTap={{ scale: 0.98 }} className={widthClassName ? 'w-full' : 'inline-flex'}>
      <button
        className={`${baseClassName} ${variantClassName} ${widthClassName} ${className}`.trim()}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/80 border-r-transparent" />
        ) : null}
        {children}
      </button>
    </motion.div>
  )
}
