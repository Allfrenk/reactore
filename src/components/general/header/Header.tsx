import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ThemeToggleIcon } from '@/components/general/themeToggle/ThemeToggleIcon'
import { logout } from '@/lib/auth.actions'
import { toggleSidebar } from '@/slices/layoutSlice'
import { LogOut, Menu, X } from 'lucide-react'

export function Header() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  const userName = 'Alessandro'

  return (
    <div className="header-root">
      {/* LEFT: toggle + logo (un solo click target) */}
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={() => dispatch(toggleSidebar())}
        className="header-toggle flex cursor-pointer items-center transition-opacity duration-200 hover:opacity-80"
      >
        {/* ICON */}
        <span className="header-icon relative flex items-center justify-center">
          <Menu
            className={`absolute transition-all duration-250 ease-in-out ${sidebarOpen ? 'scale-90 opacity-0' : 'scale-100 opacity-100'} `}
            strokeWidth={2}
          />
          <X
            className={`absolute text-(--accent-primary) transition-all duration-250 ease-in-out ${sidebarOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} `}
            strokeWidth={2}
          />
        </span>

        {/* LOGO */}
        <span className="header-title flex items-center leading-none">
          <span>react</span>
          <span className="font-extrabold text-(--accent-primary)">ore</span>
        </span>
      </button>

      {/* RIGHT */}
      {/* RIGHT */}
      <div className="header-right flex items-center gap-3">
        <ThemeToggleIcon />

        <span className="header-user">ciao {userName}</span>

        <button
          type="button"
          aria-label="Logout"
          onClick={() => void logout()}
          className="opacity-60 transition hover:opacity-100"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
}
