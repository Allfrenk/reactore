import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
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

    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning, time, dispatch])

  const start = () => setIsRunning(true)

  const stop = () => setIsRunning(false)

  const reset = () => {
    setIsRunning(false)
    dispatch(
      updateHookValue({
        hook: 'useEffect',
        value: '0',
      })
    )
  }

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
            onClick={start}
            disabled={isRunning}
            className="rounded-xl bg-(--accent-primary) px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-40"
          >
            Start
          </button>

          <button
            onClick={stop}
            disabled={!isRunning}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition disabled:opacity-40"
          >
            Stop
          </button>

          <button
            onClick={reset}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition"
          >
            Reset
          </button>
        </div>

        {/* STATUS */}
        <p className="text-muted-foreground text-center text-xs">
          Status: <span className="font-mono">{isRunning ? 'running' : 'stopped'}</span>
        </p>
      </div>
    </ActionCard>
  )
}
