import { useAppSelector } from '@/app/hooks'
import { Home } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  return (
    <aside
      className={`
        app-sidebar
        flex flex-col items-center
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <nav className="mt-6 flex flex-col items-center gap-4">
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
    </aside>
  )
}
