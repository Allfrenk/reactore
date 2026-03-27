import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { trackPageInteraction } from '@/core/firebase/trackPageInteraction'
import { useStateConfig } from '@/features/hooks-playground/config/useState.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'
import { updateHookValue } from '@/state/hooksSlice'

export function UseStateAction() {
  const dispatch = useAppDispatch()

  // 🔁 Persisted value
  const count = useAppSelector(state => Number(state.hooks.data.useState.value))

  const { title, subtitle } = useStateConfig.action

  const decrement = () => {
    dispatch(
      updateHookValue({
        hook: 'useState',
        value: String(Math.max(0, count - 1)),
      })
    )
    trackPageInteraction('useState', 'decrement')
  }

  const increment = () => {
    dispatch(
      updateHookValue({
        hook: 'useState',
        value: String(count + 1),
      })
    )
    trackPageInteraction('useState', 'increment')
  }

  const reset = () => {
    dispatch(
      updateHookValue({
        hook: 'useState',
        value: '0',
      })
    )
    trackPageInteraction('useState', 'reset')
  }

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-7">
        {/* VALUE */}
        <div className="text-center">
          <div className="text-6xl font-semibold tabular-nums">{count}</div>
          <p className="text-muted-foreground mt-1 text-sm">Current value</p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={decrement}
            disabled={count === 0}
            className="hover:bg-muted rounded-xl border px-7 py-4 text-xl font-semibold transition disabled:opacity-40"
          >
            −
          </button>

          <button
            onClick={increment}
            className="rounded-xl bg-(--accent-primary) px-7 py-4 text-xl font-semibold text-white transition hover:opacity-90"
          >
            +
          </button>

          <button
            onClick={reset}
            className="hover:bg-muted rounded-xl border px-6 py-4 text-sm transition"
          >
            Reset
          </button>
        </div>
      </div>
    </ActionCard>
  )
}
