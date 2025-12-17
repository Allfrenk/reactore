import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { syncSystemTheme, toggleTheme } from '@/slices/themeSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useAppDispatch()
  const { mode, resolvedMode } = useAppSelector(s => s.theme)

  useEffect(() => {
    if (mode !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => dispatch(syncSystemTheme())

    // compatibilità ampia
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [dispatch, mode])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg text-fg">
      <div className="text-5xl">🌓</div>

      <h1 className="text-2xl font-semibold">React 19 Starter</h1>

      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className="rounded-md border border-border bg-muted px-4 py-2 transition hover:opacity-80"
      >
        Theme: {mode} ({resolvedMode})
      </button>
    </div>
  )
}

export default App
