import { useEffect, useState } from 'react'

import { useEffectConfig } from '@/features/hooks-playground/config/useEffect.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'

export function UseEffectAction() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const { title, subtitle } = useEffectConfig.action

  useEffect(() => {
    // ✅ No timer unless explicitly running
    if (!isRunning) return

    const intervalId = setInterval(() => {
      // ✅ Functional update avoids stale closures
      setTime(t => t + 1)
    }, 1000)

    // ✅ Cleanup: stop the side effect when dependencies change/unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning])

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-6">
        {/* TIMER */}
        <div className="text-center">
          <div className="text-5xl font-semibold tabular-nums">{time}s</div>
          <p className="text-muted-foreground mt-1 text-sm">Elapsed time</p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className="rounded-xl bg-(--accent-primary) px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-40"
          >
            Start
          </button>

          <button
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition disabled:opacity-40"
          >
            Stop
          </button>

          <button
            onClick={() => {
              setIsRunning(false)
              setTime(0)
            }}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition"
          >
            Reset
          </button>
        </div>

        {/* STATUS (small didactic hint) */}
        <p className="text-muted-foreground text-center text-xs">
          Status: <span className="font-mono">{isRunning ? 'running' : 'stopped'}</span>
        </p>
      </div>
    </ActionCard>
  )
}
