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
      ? 'bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] text-[#FFF7EF] shadow-lg shadow-[#6F4E37]/25 hover:translate-y-[-1px] hover:brightness-105'
      : variant === 'soft'
        ? 'border border-[#6F4E37]/50 bg-[#FED8B1]/35 text-[#4B2E2B] shadow-sm hover:bg-[#FED8B1]/55 dark:border-[#ECB176]/40 dark:bg-[#6F4E37]/45 dark:text-[#FED8B1] dark:hover:bg-[#6F4E37]/60'
        : 'text-[#4B2E2B] hover:bg-[#FED8B1]/40 dark:text-[#FED8B1] dark:hover:bg-[#6F4E37]/55'

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
