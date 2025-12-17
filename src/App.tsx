import { ThemeToggleIcon } from '@/components/ThemeToggleIcon'

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg text-fg font-sans">
      <ThemeToggleIcon />
      <h1 className="text-center text-7xl font-semibold tracking-tight">React 19</h1>
    </div>
  )
}

export default App
