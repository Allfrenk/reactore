import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { closeSidebar } from '@/slices/layoutSlice'

type AppShellProps = {
  header: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export function AppShell({ header, sidebar, children }: AppShellProps) {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  return (
    <div className="app-shell flex h-full w-full flex-col">
      {/* HEADER */}
      <header className="app-header sticky top-0 z-50 shrink-0">{header}</header>

      {/* BODY */}
      <div className="app-body relative flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        {sidebar && (
          <>
            {/* BACKDROP — solo mobile */}
            {sidebarOpen && (
              <div
                onClick={() => dispatch(closeSidebar())}
                className="fixed inset-0 z-30 bg-black/40 md:hidden"
              />
            )}

            <aside
              className={`app-sidebar /* MOBILE */ fixed top-[clamp(56px,6vw,72px)] left-0 z-40 h-[calc(100vh-clamp(56px,6vw,72px))] w-[clamp(200px,55vw,240px)] overflow-hidden transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} /* DESKTOP */ md:static md:h-full md:translate-x-0 md:transition-[width,opacity] md:duration-300 md:ease-in-out ${
                sidebarOpen ? 'md:w-[clamp(260px,28vw,300px)] lg:w-[320px]' : 'md:w-0'
              } `}
            >
              {sidebar}
            </aside>
          </>
        )}

        {/* MAIN */}
        <main
          className={`app-content no-scrollbar h-full flex-1 overflow-y-auto ${
            sidebarOpen ? 'overflow-hidden md:overflow-y-auto' : ''
          } `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
