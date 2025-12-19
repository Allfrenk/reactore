import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ThemeToggleIcon } from '@/components/general/themeToggle/ThemeToggleIcon'
import { logout } from '@/lib/auth.actions'
import { toggleSidebar } from '@/slices/layoutSlice'
import { LogOut, Menu, X } from 'lucide-react'

export function Header() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)
  const firstName = useAppSelector(state => state.user.firstName)

  return (
    <div className="header-root">
      {/* LEFT */}
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={() => dispatch(toggleSidebar())}
        className="header-toggle flex items-center transition-opacity hover:opacity-80"
      >
        <span className="header-icon relative flex items-center justify-center">
          <Menu
            className={`absolute transition-all duration-200 ${
              sidebarOpen ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute text-(--accent-primary) transition-all duration-200 ${
              sidebarOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          />
        </span>

        <span className="header-title flex items-center leading-none">
          <span>react</span>
          <span className="font-extrabold text-(--accent-primary)">ore</span>
        </span>
      </button>

      <div className="header-right flex items-center gap-3">
        {/* Nome sempre visibile */}
        {firstName && <span className="header-user">ciao {firstName}</span>}

        {/* Azioni SOLO desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggleIcon />

          <button
            onClick={() => void logout()}
            title="Logout"
            className="opacity-70 transition hover:opacity-100"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
