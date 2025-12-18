import { Home } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <nav className="h-full w-full p-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `
          flex h-12 w-12 items-center justify-center rounded-xl
          transition-colors
          ${
            isActive
              ? 'bg-(--accent-primary)/15 text-(--accent-primary)'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
          }
        `
        }
        aria-label="Home"
      >
        <Home size={22} strokeWidth={1.75} />
      </NavLink>
    </nav>
  )
}
