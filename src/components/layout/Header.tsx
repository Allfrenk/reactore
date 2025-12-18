import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ThemeToggleIcon } from '@/components/ThemeToggleIcon'
import { toggleSidebar } from '@/slices/layoutSlice'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  // mock user (in futuro store / firebase)
  const userName = 'Alessandro'

  return (
    <div className="header-root">
      <div className="header-left flex items-center">
        <NavLink
          to="/"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle sidebar"
          className="
            flex items-center
            cursor-pointer
            hover:opacity-80
            transition-opacity duration-200
          "
        >
          <span
            className="
              relative
              flex items-center justify-center
              h-6 w-5
              mr-0.5
            "
          >
            <Menu
              size={18}
              strokeWidth={2}
              className={`
                absolute
                transition-all duration-250 ease-in-out
                translate-y-0.5
                ${
                  sidebarOpen
                    ? 'opacity-0 scale-90'
                    : 'opacity-100 scale-100 text-muted-foreground'
                }
              `}
            />

            <X
              size={20}
              strokeWidth={2}
              className={`
                absolute
                transition-all duration-250 ease-in-out
                translate-y-0.5
                ${
                  sidebarOpen
                    ? 'opacity-100 scale-100 text-(--accent-primary)'
                    : 'opacity-0 scale-90'
                }
              `}
            />
          </span>

          <span className="header-title flex items-center leading-none">
            <span>react</span>
            <span className="text-(--accent-primary) font-extrabold">ore</span>
          </span>
        </NavLink>
      </div>

      <div className="header-right cursor-default">
        <ThemeToggleIcon />
        <span className="header-user">ciao {userName}</span>
      </div>
    </div>
  )
}
