import type { Config } from 'tailwindcss'


const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--app-bg)',
        'bg-muted': 'var(--app-bg-muted)',
        'bg-card': 'var(--card-bg)',
        'bg-card-brown': 'var(--card-bg-brown)',
        'text-card-foreground': 'var(--card-foreground)',
        'text-card-foreground-brown': 'var(--card-foreground-brown)',
        'text-primary': 'var(--primary)',
        'text-secondary': 'var(--text-main)',
        'border-muted': 'var(--border)',
        'brand-primary': 'var(--primary)',
        'brand-secondary': 'var(--accent)',
        'brand-accent': 'var(--accent-soft)',
        'brand-soft': 'var(--accent-soft)',
      },
    },
  },
}

export default config
