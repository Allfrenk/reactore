import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { trackPageInteraction } from '@/core/firebase/trakPageInteraction'
import { useEffectConfig } from '@/features/hooks-playground/config/useEffect.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'
import { updateHookValue } from '@/state/hooksSlice'

export function UseEffectAction() {
  const dispatch = useAppDispatch()

  // 🔁 Persisted value
  const time = Number(useAppSelector(state => state.hooks.data.useEffect.value))

  // 🔵 Runtime-only state
  const [isRunning, setIsRunning] = useState(false)

  const { title, subtitle } = useEffectConfig.action

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      dispatch(
        updateHookValue({
          hook: 'useEffect',
          value: String(time + 1),
        })
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning, time, dispatch])

  // ⬇️ sostituisci SOLO queste tre funzioni

  const start = () => {
    setIsRunning(true)
    trackPageInteraction('useEffect', 'start')
  }

  const stop = () => {
    setIsRunning(false)
    trackPageInteraction('useEffect', 'stop')
  }

  const reset = () => {
    setIsRunning(false)
    dispatch(
      updateHookValue({
        hook: 'useEffect',
        value: '0',
      })
    )
    trackPageInteraction('useEffect', 'reset')
  }

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-7">
        {/* TIMER */}
        <div className="text-center">
          <div className="text-6xl font-semibold tabular-nums">{time}s</div>
          <p className="text-muted-foreground mt-1 text-sm">Elapsed time</p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={start}
            disabled={isRunning}
            className="rounded-xl bg-(--accent-primary) px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            Start
          </button>

          <button
            onClick={stop}
            disabled={!isRunning}
            className="hover:bg-muted rounded-xl border px-6 py-4 text-sm transition disabled:opacity-40"
          >
            Stop
          </button>

          <button
            onClick={reset}
            className="hover:bg-muted rounded-xl border px-6 py-4 text-sm transition"
          >
            Reset
          </button>
        </div>

        {/* STATUS */}
        <p className="text-muted-foreground text-center text-sm">
          Status: <span className="font-mono">{isRunning ? 'running' : 'stopped'}</span>
        </p>
      </div>
    </ActionCard>
  )
}
