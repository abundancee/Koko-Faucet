import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-border-muted bg-bg-card transition-colors duration-300 ease-in-out hover:brightness-105 dark:hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-brand-primary transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-brand-accent transition-transform duration-300" />
      )}
    </button>
  )
}
