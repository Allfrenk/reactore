import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>))',
        fg: 'rgb(var(--color-fg) / <alpha-value>))',
        muted: 'rgb(var(--color-muted) / <alpha-value>))',
        border: 'rgb(var(--color-border) / <alpha-value>))',
        primary: 'rgb(var(--color-primary) / <alpha-value>))',
      },
      borderRadius: {
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
}

export default config
