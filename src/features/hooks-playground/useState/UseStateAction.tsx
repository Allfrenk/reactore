import { useStateConfig } from '@/features/hooks-playground/config/useState.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'
import { useState } from 'react'

export function UseStateAction() {
  const [count, setCount] = useState(0)

  const { title, subtitle } = useStateConfig.action

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <div className="text-5xl font-semibold tabular-nums">{count}</div>
          <p className="text-muted-foreground mt-1 text-sm">Current value</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCount(prev => Math.max(0, prev - 1))}
            disabled={count === 0}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition disabled:opacity-40"
          >
            −
          </button>

          <button
            onClick={() => setCount(prev => prev + 1)}
            className="rounded-xl bg-(--accent-primary) px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            +
          </button>

          <button
            onClick={() => setCount(0)}
            className="hover:bg-muted rounded-xl border px-4 py-2 text-sm transition"
          >
            Reset
          </button>
        </div>
      </div>
    </ActionCard>
  )
}
