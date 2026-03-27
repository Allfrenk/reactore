import { useReducer, useState } from 'react'

import { trackPageInteraction } from '@/core/firebase/trackPageInteraction'
import { useReducerConfig } from '@/features/hooks-playground/config/useReducer.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'

/* =========================
   REDUCER
========================== */

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return Math.max(0, state - 1)
    case 'RESET':
      return 0
  }
}

/* =========================
   ACTION LOG
========================== */

const MAX_LOG = 5

/* =========================
   COMPONENT
========================== */

export function UseReducerAction() {
  const { title, subtitle } = useReducerConfig.action

  const [count, dispatch] = useReducer(counterReducer, 0)
  const [log, setLog] = useState<Action[]>([])

  const dispatchAndLog = (action: Action) => {
    dispatch(action)
    setLog(prev => [action, ...prev].slice(0, MAX_LOG))
    trackPageInteraction('useReducer', action.type.toLowerCase())
  }

  const lastAction = log[0]

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-7">
        {/* DISPATCH LOG */}
        <div className="glass-inset flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-muted-foreground text-xs">Last dispatched action</span>
          <code
            className={`text-sm font-semibold transition-colors duration-300 ${
              lastAction ? 'text-(--accent-primary)' : 'text-muted-foreground'
            }`}
          >
            {lastAction
              ? `{ type: '${lastAction.type}' }`
              : '— none yet'}
          </code>
        </div>

        {/* COUNTER */}
        <div className="text-center">
          <div className="text-6xl font-semibold tabular-nums">{count}</div>
          <p className="text-muted-foreground mt-1 text-sm">Current state</p>
        </div>

        {/* DISPATCH BUTTONS */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => dispatchAndLog({ type: 'DECREMENT' })}
            disabled={count === 0}
            className="hover:bg-muted rounded-xl border px-7 py-4 text-xl font-semibold transition disabled:opacity-40"
          >
            −
          </button>

          <button
            onClick={() => dispatchAndLog({ type: 'INCREMENT' })}
            className="rounded-xl bg-(--accent-primary) px-7 py-4 text-xl font-semibold text-white transition hover:opacity-90"
          >
            +
          </button>

          <button
            onClick={() => dispatchAndLog({ type: 'RESET' })}
            className="hover:bg-muted rounded-xl border px-6 py-4 text-sm transition"
          >
            Reset
          </button>
        </div>

        {/* ACTION HISTORY */}
        {log.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-muted-foreground text-xs font-medium">Action log</span>

            <div className="flex flex-col gap-1">
              {log.map((action, i) => (
                <div
                  key={i}
                  className={`glass-inset flex items-center justify-between rounded-lg px-3 py-2 transition-opacity duration-300 ${
                    i === 0 ? 'opacity-100' : i === 1 ? 'opacity-60' : 'opacity-30'
                  }`}
                >
                  <span className="text-muted-foreground font-mono text-xs">
                    #{log.length - i}
                  </span>
                  <code className="font-mono text-xs">
                    {`{ type: '${action.type}' }`}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-muted-foreground text-center text-xs">
          Each button calls <code>dispatch(action)</code>. The reducer decides the next
          state — the component never mutates it directly.
        </p>
      </div>
    </ActionCard>
  )
}
