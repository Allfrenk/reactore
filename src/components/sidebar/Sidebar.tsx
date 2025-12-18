import { useAppSelector } from '@/app/hooks'
import { sidebarConfig } from '@/configs/sidebar.config'
import { NavLink, useLocation } from 'react-router-dom'

export function Sidebar() {
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)
  const { pathname } = useLocation()

  return (
    <nav className="flex h-full w-full flex-col gap-6 p-4">
      {sidebarConfig.map(entry => {
        if (entry.type === 'item') {
          const Icon = entry.icon
          return (
            <NavLink
              key={entry.to}
              to={entry.to}
              aria-label={entry.label}
              className={({ isActive }) =>
                `flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? 'bg-(--accent-primary)/15 text-(--accent-primary)'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                } `
              }
            >
              <Icon size={22} strokeWidth={1.75} />
            </NavLink>
          )
        }

        // GROUP
        const Icon = entry.icon
        const groupActive = pathname.startsWith(entry.basePath)

        return (
          <div key={entry.label} className="flex flex-col gap-2">
            {/* Group header */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  groupActive
                    ? 'bg-(--accent-primary)/15 text-(--accent-primary)'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                } `}
              >
                <Icon size={22} strokeWidth={1.75} />
              </div>

              <span
                className={`text-muted-foreground text-sm font-medium whitespace-nowrap transition-all ${
                  sidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
                } `}
              >
                {entry.label}
              </span>
            </div>

            {/* Children */}
            {entry.children.map(child => (
              <NavLink
                key={child.to}
                to={child.to}
                aria-label={child.label}
                className={({ isActive }) =>
                  `ml-[60px] py-2 text-sm font-medium whitespace-nowrap transition-all ${
                    sidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
                  } ${
                    isActive
                      ? 'text-(--accent-primary)'
                      : 'text-muted-foreground hover:text-foreground'
                  } `
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )
      })}
    </nav>
  )
}
