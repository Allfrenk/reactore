import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { sidebarConfig } from '@/shared/components/layout/sidebar.config'
import { closeSidebar } from '@/state/layoutSlice'
import { NavLink, useLocation } from 'react-router-dom'

export function Sidebar() {
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const handleNavigate = () => {
    if (window.innerWidth < 768) {
      dispatch(closeSidebar())
    }
  }

  return (
    <nav className="flex h-full w-full flex-col gap-6 p-4">
      <div className="flex flex-col gap-6">
        {sidebarConfig.map(entry => {
          /* ---------- SINGLE ITEM (Home) ---------- */
          if (entry.type === 'item') {
            const Icon = entry.icon

            return (
              <NavLink
                key={entry.to}
                to={entry.to}
                aria-label={entry.label}
                onClick={handleNavigate}
                className={({ isActive }) =>
                  `flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? 'bg-(--accent-primary)/15 text-(--accent-primary)'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`
                }
              >
                <Icon size={22} strokeWidth={1.75} />
              </NavLink>
            )
          }

          /* ---------- GROUP ITEM (Hooks Playground) ---------- */
          const Icon = entry.icon
          const groupActive = pathname.startsWith(entry.basePath)

          return (
            <div key={entry.label} className="relative flex flex-col gap-2">
              {/* GROUP HEADER */}
              <div className="relative flex h-12 items-center">
                {/* ICON — colonna fissa */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    groupActive
                      ? 'bg-(--accent-primary)/15 text-(--accent-primary)'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                {/* LABEL — fuori dal flow */}
                <span
                  className={`absolute left-[60px] text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {entry.label}
                </span>
              </div>

              {/* CHILDREN */}
              {entry.children.map(child => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  onClick={handleNavigate}
                  className={({ isActive }) =>
                    `ml-[60px] py-2 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${
                      sidebarOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                    } ${
                      isActive
                        ? 'text-(--accent-primary)'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
