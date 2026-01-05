import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useMemoConfig } from '../config/useMemo.config'

export function UseMemoExplain() {
  const { title, subtitle, codeExample } = useMemoConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      {/* TECHNICAL */}
      <p>
        <code>useMemo</code> allows React to <strong>cache the result</strong> of a
        computation. The function passed to <code>useMemo</code> is executed again only
        when one of its dependencies changes.
      </p>

      <p>
        This means that <strong>re-renders still happen</strong>, but the expensive
        calculation does not run again if its inputs are the same.
      </p>

      <p>
        Without <code>useMemo</code>, every render executes the computation again — even
        if the component re-renders for unrelated reasons.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      {/* IMPORTANT CLARIFICATION */}
      <p>
        <strong>Important:</strong> <code>useMemo</code> is a performance optimization,
        not a logic tool. It should be used only when a computation is expensive and you
        have measured or observed unnecessary recalculations.
      </p>

      {/* CHILD LEVEL */}
      <p>
        <strong>Like explaining to a child:</strong> imagine you solve a very hard puzzle.
        If the puzzle doesn’t change, it makes no sense to solve it again every time
        someone walks into the room. <code>useMemo</code> lets React keep the answer in
        its pocket and reuse it until the puzzle changes.
      </p>

      {/* CONNECTION */}
      <p>
        If you need to <strong>memoize functions instead of values</strong>, you will use
        a similar hook called <code>useCallback</code>.
      </p>
    </ExplainCard>
  )
}
