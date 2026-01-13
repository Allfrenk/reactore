import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { trackPageInteraction } from '@/core/firebase/trakPageInteraction'
import { useCallbackConfig } from '@/features/hooks-playground/config/useCallback.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'

/* =========================
   CHILD (memoized)
========================== */

type ChildProps = {
  onIncrement: () => void
}

const Child = memo(({ onIncrement }: ChildProps) => {
  const rendersRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    rendersRef.current += 1
    setRenderCount(rendersRef.current)

    setPulse(true)
    const t = window.setTimeout(() => setPulse(false), 500)
    return () => window.clearTimeout(t)
  }, [onIncrement])

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-500 ${
        pulse
          ? 'border-(--accent-primary)/60 shadow-[0_0_20px_var(--accent-primary)/30]'
          : 'border-current/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Child (memoized)</span>

        <span
          className={`rounded-full border px-3 py-1 text-xs transition ${
            pulse
              ? 'border-(--accent-primary) text-(--accent-primary)'
              : 'text-muted-foreground'
          }`}
        >
          Render #{renderCount}
        </span>
      </div>

      <p className="text-muted-foreground mt-2 text-xs">
        This component re-renders only when the callback reference changes.
      </p>

      <p className="text-muted-foreground mt-1 text-[11px]">
        When the child re-renders, a pulse animation is shown.
      </p>
    </div>
  )
})

Child.displayName = 'Child'

/* =========================
   ACTION
========================== */

export function UseCallbackAction() {
  const { title, subtitle } = useCallbackConfig.action

  const [count, setCount] = useState(0)
  const [unrelated, setUnrelated] = useState(0)
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true)

  /* -------------------------
     CALLBACKS
  -------------------------- */

  const onPlusRaw = () => {
    setCount(c => c + 1)
    trackPageInteraction('useCallback', 'increment')
  }

  const onMinusRaw = () => {
    setCount(c => Math.max(0, c - 1))
    trackPageInteraction('useCallback', 'decrement')
  }

  const onPlusMemo = useCallback(() => {
    setCount(c => c + 1)
    trackPageInteraction('useCallback', 'increment')
  }, [])

  const onMinusMemo = useCallback(() => {
    setCount(c => Math.max(0, c - 1))
    trackPageInteraction('useCallback', 'decrement')
  }, [])

  const onPlus = useCallbackEnabled ? onPlusMemo : onPlusRaw
  const onMinus = useCallbackEnabled ? onMinusMemo : onMinusRaw

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-6">
        {/* CODE + PLUS */}
        <div className="flex items-center gap-4">
          <div className="glass-inset flex-1 rounded-xl p-3 font-mono text-xs">
            <code>
              {useCallbackEnabled
                ? `const onPlus = useCallback(() =>
  setCount(c => c + 1), [])`
                : `const onPlus = () =>
  setCount(c => c + 1)`}
            </code>
          </div>

          <button
            onClick={onPlus}
            className="rounded-xl bg-(--accent-primary) px-7 py-4 text-xl font-semibold text-white transition hover:opacity-90"
          >
            +
          </button>
        </div>

        {/* CODE + MINUS */}
        <div className="flex items-center gap-4">
          <div className="glass-inset flex-1 rounded-xl p-3 font-mono text-xs">
            <code>
              {useCallbackEnabled
                ? `const onMinus = useCallback(() =>
  setCount(c => Math.max(0, c - 1)), [])`
                : `const onMinus = () =>
  setCount(c => Math.max(0, c - 1))`}
            </code>
          </div>

          <button
            onClick={onMinus}
            disabled={count === 0}
            className="hover:bg-muted rounded-xl border px-7 py-4 text-xl font-semibold transition disabled:opacity-40"
          >
            −
          </button>
        </div>

        {/* VALUE + TOGGLE */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-semibold tabular-nums">{count}</div>
            <p className="text-muted-foreground text-xs">Parent value</p>
          </div>

          <button
            onClick={() => {
              setUseCallbackEnabled(v => !v)
              trackPageInteraction('useCallback', 'toggle_useCallback')
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              useCallbackEnabled
                ? 'bg-(--accent-primary) text-white'
                : 'text-muted-foreground border hover:bg-(--accent-primary)/10'
            }`}
          >
            {useCallbackEnabled ? 'useCallback ON' : 'useCallback OFF'}
          </button>
        </div>

        {/* CHILD */}
        <Child onIncrement={onPlus} />

        <button
          onClick={() => {
            setUnrelated(v => v + 1)
            trackPageInteraction('useCallback', 'trigger_rerender')
          }}
          className="rounded-xl border px-4 py-2 text-sm transition hover:bg-(--accent-primary)/10"
        >
          Trigger parent re-render (unrelated) ({unrelated})
        </button>

        <p className="text-muted-foreground text-center text-xs">
          {useCallbackEnabled
            ? 'ON: re-rendering the parent does NOT re-render the child.'
            : 'OFF: every parent render creates a new function → child re-renders.'}
        </p>
      </div>
    </ActionCard>
  )
}
