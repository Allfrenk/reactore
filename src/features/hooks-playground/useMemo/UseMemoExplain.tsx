import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useMemoConfig } from '../config/useMemo.config'

export function UseMemoExplain() {
  const { title, subtitle, codeExample } = useMemoConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useMemo</code> caches the <strong>return value</strong> of a function and
        reuses it on the next render — unless one of its listed dependencies has changed.
        The component still re-renders; only the expensive calculation is skipped.
      </p>

      <p>
        Without it, every render calls the function from scratch — even when the inputs
        are identical and the result would be exactly the same. For cheap calculations
        this is harmless. For heavy computations (sorting large lists, running complex
        math), it adds up quickly.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>Use it deliberately, not by default.</strong> Memoization has its own
        cost — React must store the result and compare dependencies on every render. If
        the calculation is cheap or the input changes frequently, you gain nothing and add
        complexity. Measure first, optimize second.
      </p>

      <p>
        To memoize a <strong>function reference</strong> instead of a computed value, use{' '}
        <code>useCallback</code> — it follows the exact same pattern.
      </p>

      <p>
        <strong>Like explaining to a child:</strong> you spent an hour solving a really
        hard puzzle. Someone asks "what does the finished puzzle look like?" — instead of
        taking it apart and rebuilding it, you take a photo. Next time someone asks, you
        just show the photo. <code>useMemo</code> is that photo: React keeps it in its
        pocket and only tears the puzzle apart again when the pieces actually change.
      </p>
    </ExplainCard>
  )
}
