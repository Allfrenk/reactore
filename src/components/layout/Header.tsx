import { ThemeToggleIcon } from '@/components/ThemeToggleIcon'

export function Header() {
  return (
    <div className="header-root">
      <div className="header-left">
        <span className="header-title">react19 demo</span>
      </div>

      <div className="header-right">
        <ThemeToggleIcon />
        <span className="header-user">Alessandro</span>
      </div>
    </div>
  )
}
