import { useState } from 'react'

import { ActionCard } from '@/components/actionCard/ActionCard'
import { ExplainCard } from '@/components/explainCard/ExplainCard'
import { HookPageLayout } from '@/components/hookPageLayout/HookPageLayout'
import { TiltCardWrapper } from '@/components/ui/tiltCardWrapper/TiltCardWrapper'

export function UseStatePage() {
  const [count, setCount] = useState(0)

  return (
    <HookPageLayout
      title="useState"
      description="Managing local component state"
      action={
        <TiltCardWrapper>
          <ActionCard title="Counter demo" subtitle="Local state with useState">
            <div className="flex flex-col gap-6">
              {/* Counter value */}
              <div className="text-center">
                <div className="text-5xl font-semibold tabular-nums">{count}</div>
                <p className="text-muted-foreground mt-1 text-sm">Current value</p>
              </div>

              {/* Actions */}
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
        </TiltCardWrapper>
      }
      explanation={
        <TiltCardWrapper>
          <ExplainCard title="How useState works" subtitle="State, updates and re-render">
            <p>
              <code>useState</code> lets you add local state to a function component. It
              returns the current state value and a setter function.
            </p>

            <p>
              Calling the setter schedules a re-render with the new state value. React
              batches updates to keep rendering efficient.
            </p>

            <p>Using the functional form:</p>

            <pre className="rounded-lg bg-black/5 p-3 text-xs">
              <code>{`setCount(prev => prev + 1)`}</code>
            </pre>

            <p>
              guarantees you always work with the latest state, even when multiple updates
              happen in quick succession.
            </p>
          </ExplainCard>
        </TiltCardWrapper>
      }
    />
  )
}
