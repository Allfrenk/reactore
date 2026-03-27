import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { sidebarConfig } from '@/shared/components/layout/sidebar.config'
import { closeSidebar } from '@/state/layoutSlice'
import { NavLink, useLocation } from 'react-router-dom'

export function Sidebar() {
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const handleNavigate = () => {
    if (window.innerWidth < 768) dispatch(closeSidebar())
  }

  const iconButtonClass = (active: boolean) =>
    `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
      active
        ? 'bg-(--accent-primary)/15 text-(--accent-primary)'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
    }`

  const labelClass =
    `absolute left-[60px] text-sm font-medium whitespace-nowrap transition-opacity duration-200 text-muted-foreground ` +
    (sidebarOpen ? 'opacity-100' : 'opacity-0')

  return (
    <nav className="flex h-full w-full flex-col gap-6 p-4 pb-20">
      <div className="flex flex-col gap-6">
        {sidebarConfig.map(entry => {
          const Icon = entry.icon
          const isActive =
            entry.type === 'item'
              ? pathname === entry.to
              : pathname.startsWith(entry.basePath)

          return (
            <div key={entry.label} className="relative flex flex-col gap-2">
              <NavLink
                to={entry.to}
                onClick={handleNavigate}
                className="relative flex h-12 items-center"
              >
                <div className={iconButtonClass(isActive)} aria-label={entry.label}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                <span className={labelClass}>{entry.label}</span>
              </NavLink>

              {entry.type === 'group' &&
                entry.children.map(child => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    aria-label={child.label}
                    onClick={handleNavigate}
                    className={({ isActive }) =>
                      `ml-[60px] flex items-center gap-2 py-2 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${
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
                    <span>{child.label}</span>

                    {child.badge === 'new' && (
                      <span className="app-badge app-badge--new">NEW</span>
                    )}
                  </NavLink>
                ))}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
