import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { logout } from '@/features/auth/auth.actions'
import { ThemeToggleIcon } from '@/shared/components/theme/ThemeToggleIcon'
import { clearUser } from '@/state/userSlice'
import { clearThemeSelected } from '@/state/themeSlice'
import { toggleSidebar } from '@/state/layoutSlice'
import { LogOut, Menu, X } from 'lucide-react'

export function Header() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)
  const displayName = useAppSelector(state => state.user.user?.displayName)
  const isDemoMode = useAppSelector(state => state.user.isDemoMode)

  const firstName = displayName?.split(' ')[0]

  const handleLogout = () => {
    if (isDemoMode) {
      dispatch(clearUser())
      dispatch(clearThemeSelected())
    } else {
      void logout()
    }
  }

  return (
    <div className="header-root flex items-center justify-between">
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

      {/* RIGHT */}
      <div className="header-right flex items-center gap-3">
        {isDemoMode ? (
          <span className="header-user font-mono text-xs font-semibold tracking-widest text-(--accent-primary)">
            DEMO
          </span>
        ) : (
          firstName && <span className="header-user">hi {firstName}</span>
        )}

        {/* THEME TOGGLE — SOLO TABLET + DESKTOP */}
        <div className="hidden md:flex">
          <ThemeToggleIcon />
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
          className="opacity-70 transition hover:opacity-100"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  )
}
