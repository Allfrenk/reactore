import { useEffect, useMemo, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { trackPageInteraction } from '@/core/firebase/trackPageInteraction'
import { useMemoConfig } from '@/features/hooks-playground/config/useMemo.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'
import { updateHookValue } from '@/state/hooksSlice'

// ⚙️ Computazione costosa ma controllata
function expensiveComputation(n: number): number {
  let total = 0
  for (let i = 0; i < 5_000_000; i++) {
    total += Math.sqrt(n + i)
  }
  return Math.floor(total)
}

export function UseMemoAction() {
  const dispatch = useAppDispatch()

  // 🔁 Stato persistito (Redux)
  const value = useAppSelector(state => Number(state.hooks.data.useMemo.value))

  // 🔵 Stato runtime
  const [useMemoEnabled, setUseMemoEnabled] = useState(true)
  const [unrelated, setUnrelated] = useState(0)

  // ✨ Feedback UI
  const [computePulse, setComputePulse] = useState(false)
  const [renderPulse, setRenderPulse] = useState(false)

  // 🔢 Render counter (solo lettura)
  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  /* =========================
     COMPUTATION
  ========================== */

  const memoOnResult = useMemo(() => expensiveComputation(value), [value])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoOffResult = useMemo(() => expensiveComputation(value), [value, unrelated])

  const result = useMemoEnabled ? memoOnResult : memoOffResult

  /* =========================
     FEEDBACK
  ========================== */

  const triggerRenderPulse = () => {
    setRenderPulse(true)
    setTimeout(() => setRenderPulse(false), 550)
  }

  const triggerComputePulse = () => {
    setComputePulse(true)
    setTimeout(() => setComputePulse(false), 550)
  }

  useEffect(() => {
    triggerRenderPulse()
    triggerComputePulse()
  }, [value])

  useEffect(() => {
    triggerRenderPulse()
    if (!useMemoEnabled) {
      triggerComputePulse()
    }
  }, [unrelated, useMemoEnabled])

  /* =========================
     ACTIONS
  ========================== */

  // ⬇️ sostituisci SOLO queste funzioni ACTIONS

  const increment = () => {
    dispatch(updateHookValue({ hook: 'useMemo', value: String(value + 1) }))
    trackPageInteraction('useMemo', 'increment')
  }

  const decrement = () => {
    dispatch(updateHookValue({ hook: 'useMemo', value: String(Math.max(0, value - 1)) }))
    trackPageInteraction('useMemo', 'decrement')
  }

  const toggleMemo = () => {
    setUseMemoEnabled(v => !v)
    triggerRenderPulse()
    trackPageInteraction('useMemo', 'toggle_useMemo')
  }

  const triggerUnrelated = () => {
    setUnrelated(v => v + 1)
    trackPageInteraction('useMemo', 'trigger_rerender')
  }

  const { title, subtitle } = useMemoConfig.action

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-7">
        {/* STEP 1 — INPUT */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">1. Choose an input</span>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={decrement}
              disabled={value === 0}
              className="hover:bg-muted rounded-xl border px-7 py-4 text-xl font-semibold transition disabled:opacity-40"
            >
              −
            </button>

            <div className="min-w-24 text-center text-6xl font-semibold tabular-nums">
              {value}
            </div>

            <button
              onClick={increment}
              className="rounded-xl bg-(--accent-primary) px-7 py-4 text-xl font-semibold text-white transition hover:opacity-90"
            >
              +
            </button>
          </div>

          <p className="text-muted-foreground text-center text-sm">
            Changing this always triggers a <strong>recalculation</strong>.
          </p>
        </div>

        {/* STEP 2 — useMemo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">2. useMemo</span>

            <button
              onClick={toggleMemo}
              className={`rounded-md px-5 py-2 text-sm font-medium transition ${
                useMemoEnabled
                  ? 'bg-(--accent-primary) text-white'
                  : 'text-muted-foreground border hover:bg-(--accent-primary)/10'
              }`}
            >
              {useMemoEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <p className="text-muted-foreground text-sm">
            {useMemoEnabled
              ? 'Caching enabled: the computation is reused if the input does not change.'
              : 'Caching disabled: the computation runs again on every render.'}
          </p>
        </div>

        {/* STEP 3 — RESULT */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium">Result</span>

          <div
            className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-550 ${
              renderPulse
                ? 'scale-105 border-(--accent-primary) text-(--accent-primary)'
                : 'text-muted-foreground scale-100'
            }`}
          >
            Render #{renderCountRef.current}
          </div>

          <div
            className={`w-full max-w-[440px] rounded-2xl border p-5 text-center transition-all duration-550 ${
              computePulse
                ? 'border-(--accent-primary)/60 shadow-[0_0_22px_var(--accent-primary)/30]'
                : 'border-current/20'
            }`}
          >
            <div className="text-muted-foreground text-sm">Computed result</div>

            <div
              className={`mt-2 font-mono text-4xl transition-all duration-550 ${
                computePulse ? 'scale-110 text-(--accent-primary)' : 'scale-100'
              }`}
            >
              {result}
            </div>
          </div>

          <p className="text-muted-foreground max-w-md text-center text-sm">
            {useMemoEnabled
              ? 'Trigger a re-render: the render count changes, but the result does NOT.'
              : 'Trigger a re-render: both render count and result change.'}
          </p>

          <button
            onClick={triggerUnrelated}
            className="mt-2 w-full max-w-[440px] rounded-xl border px-5 py-3 text-sm transition hover:bg-(--accent-primary)/10"
          >
            Trigger a re-render (unrelated) ({unrelated})
          </button>
        </div>

        {/* STEP 4 — KEY IDEA */}
        <p className="text-muted-foreground text-center text-sm">
          <strong>Key idea:</strong> useMemo does not prevent re-renders — it prevents
          unnecessary computations.
        </p>
      </div>
    </ActionCard>
  )
}
