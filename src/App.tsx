import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'

function App() {
  return (
    <AppShell header={<Header />}>
      <div>
        <h1 className="text-3xl font-semibold">Home</h1>
        <p className="mt-2 text-muted-foreground">React 19 demo playground</p>
      </div>
    </AppShell>
  )
}

export default App
