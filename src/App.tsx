import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'

function App() {
  return (
    <AppShell header={<Header />} sidebar={<Sidebar />}>
      <div>
        <h1 className="text-3xl font-semibold">Home</h1>
        <p className="mt-2 text-muted-foreground">React&nbsp;19 demo playground</p>
      </div>
    </AppShell>
  )
}

export default App
