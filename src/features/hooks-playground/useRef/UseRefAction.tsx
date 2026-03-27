import { useRef, useState } from 'react'

import { trackPageInteraction } from '@/core/firebase/trackPageInteraction'
import { useRefConfig } from '@/features/hooks-playground/config/useRef.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'

export function UseRefAction() {
  const { title, subtitle } = useRefConfig.action

  /* =========================
     SECTION 1 — DOM Ref
  ========================== */
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    inputRef.current?.focus()
    setFocused(true)
    trackPageInteraction('useRef', 'focus_input')
  }

  /* =========================
     SECTION 2 — Mutable ref (no re-render)
  ========================== */
  const silentCountRef = useRef(0)
  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  const [displayedCount, setDisplayedCount] = useState<number | null>(null)
  const [renderSnapshot, setRenderSnapshot] = useState(0)

  const incrementSilent = () => {
    silentCountRef.current += 1
    // intentionally no setState — no re-render
    trackPageInteraction('useRef', 'silent_increment')
  }

  const readRef = () => {
    // force re-render to display the current ref value
    setDisplayedCount(silentCountRef.current)
    setRenderSnapshot(renderCountRef.current + 1)
    trackPageInteraction('useRef', 'read_ref')
  }

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-8">
        {/* ── SECTION 1: DOM Ref ── */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">1 — DOM access</span>

          <input
            ref={inputRef}
            type="text"
            placeholder="Click the button to focus me…"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 ${
              focused
                ? 'border-(--accent-primary) ring-2 ring-(--accent-primary)/20'
                : 'border-border/60'
            }`}
          />

          <button
            onClick={handleFocus}
            className="rounded-xl bg-(--accent-primary) px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Focus Input via ref
          </button>

          <p className="text-muted-foreground text-xs">
            <code>inputRef.current.focus()</code> — no state change, no re-render.
          </p>
        </div>

        <div className="border-border/30 border-t" />

        {/* ── SECTION 2: Mutable value ── */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">2 — Mutable value, no re-render</span>

          <div className="glass-inset flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-xs">
              <code>ref.current</code> (hidden from React)
            </span>
            <span className="font-mono text-sm font-semibold">
              {silentCountRef.current}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={incrementSilent}
              className="flex-1 rounded-xl border px-4 py-3 text-sm transition hover:bg-(--accent-primary)/10"
            >
              Increment ref <span className="text-muted-foreground text-xs">(no render)</span>
            </button>

            <button
              onClick={readRef}
              className="flex-1 rounded-xl bg-(--accent-primary) px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Read ref <span className="text-xs opacity-80">(renders)</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-inset rounded-xl px-4 py-3 text-center">
              <div className="text-muted-foreground text-xs">Ref value (last read)</div>
              <div className="mt-1 font-mono text-2xl font-semibold">
                {displayedCount ?? '—'}
              </div>
            </div>
            <div className="glass-inset rounded-xl px-4 py-3 text-center">
              <div className="text-muted-foreground text-xs">Render #</div>
              <div className="mt-1 font-mono text-2xl font-semibold">
                {renderSnapshot || renderCountRef.current}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-center text-xs">
            Increment runs silently. React only learns the new value when you press Read.
          </p>
        </div>
      </div>
    </ActionCard>
  )
}
