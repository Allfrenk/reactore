import { useAppSelector } from '@/app/hooks'

type AppShellProps = {
  header: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export function AppShell({ header, sidebar, children }: AppShellProps) {
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  return (
    <div className="app-shell h-full w-full flex flex-col">
      {/* HEADER */}
      <header className="app-header sticky top-0 z-50 shrink-0">{header}</header>

      {/* BODY */}
      <div className="app-body flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        {sidebar && (
          <aside
            className={`
    app-sidebar
    shrink-0
    h-full
    overflow-hidden
    transition-[width] duration-300 ease-in-out
    ${
      sidebarOpen
        ? `
      w-[clamp(240px,40vw,280px)]
      md:w-[clamp(260px,28vw,300px)]
      lg:w-[320px]
    `
        : 'w-0'
    }
  `}
          >
            {sidebar}
          </aside>
        )}

        {/* MAIN */}
        <main
          className={`
            app-content
            flex-1
            h-full
            overflow-y-auto
            no-scrollbar
            ${
              /* su mobile, se sidebar aperta, blocchiamo lo scroll */
              sidebarOpen ? 'md:overflow-y-auto overflow-hidden' : ''
            }
          `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
