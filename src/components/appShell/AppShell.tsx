import { useAppSelector } from '@/app/hooks'

type AppShellProps = {
  header: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export function AppShell({ header, sidebar, children }: AppShellProps) {
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  return (
    <div className="app-shell flex h-full w-full flex-col">
      {/* HEADER */}
      <header className="app-header sticky top-0 z-50 shrink-0">{header}</header>

      {/* BODY */}
      <div className="app-body flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        {sidebar && (
          <aside
            className={`app-sidebar h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out ${
              sidebarOpen
                ? `w-[clamp(240px,40vw,280px)] md:w-[clamp(260px,28vw,300px)] lg:w-[320px]`
                : 'w-0'
            } `}
          >
            {sidebar}
          </aside>
        )}

        {/* MAIN */}
        <main
          className={`app-content no-scrollbar h-full flex-1 overflow-y-auto ${
            /* su mobile, se sidebar aperta, blocchiamo lo scroll */
            sidebarOpen ? 'overflow-hidden md:overflow-y-auto' : ''
          } `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
