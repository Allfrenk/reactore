import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { useStateConfig } from '@/features/hooks-playground/config/useState.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'
import { updateHookValue } from '@/state/hooksSlice'

export function UseStateAction() {
  const dispatch = useAppDispatch()

  // 🔁 Leggiamo il valore da Redux
  const count = useAppSelector(state => Number(state.hooks.data.useState.value))

  const { title, subtitle } = useStateConfig.action

  const decrement = () => {
    dispatch(
      updateHookValue({
        hook: 'useState',
        value: String(Math.max(0, count - 1)),
      })
    )
  }

  const increment = () => {
    dispatch(
      updateHookValue({
        hook: 'useState',
        value: String(count + 1),
      })
    )
  }

  const reset = () => {
    dispatch(
      updateHookValue({
        hook: 'useState',
        value: '0',
      })
    )
  }

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <div className="text-5xl font-semibold tabular-nums">{count}</div>
          <p className="text-muted-foreground mt-1 text-sm">Current value</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={decrement}
            disabled={count === 0}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition disabled:opacity-40"
          >
            −
          </button>

          <button
            onClick={increment}
            className="rounded-xl bg-(--accent-primary) px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            +
          </button>

          <button
            onClick={reset}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition"
          >
            Reset
          </button>
        </div>
      </div>
    </ActionCard>
  )
}
