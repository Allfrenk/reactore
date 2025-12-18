type AppShellProps = {
  header: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export function AppShell({ header, sidebar, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">{header}</header>

      <div className="app-body">
        {sidebar && <aside className="app-sidebar">{sidebar}</aside>}
        <main className="app-content">{children}</main>
      </div>
    </div>
  )
}
