import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useCallbackConfig } from '../config/useCallback.config'

export function UseCallbackExplain() {
  const { title, subtitle, codeExample } = useCallbackConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      {/* TECHNICAL EXPLANATION */}
      <p>
        <code>useCallback</code> is used to memoize a function reference. React will
        return the <strong>same function instance</strong> between renders, as long as its
        dependency list doesn’t change.
      </p>

      <p>
        This matters when you pass functions as props to child components. In JavaScript,
        functions are objects: creating a new function means creating a new reference.
      </p>

      <p>
        If a child component is memoized (for example with <code>React.memo</code>), a new
        function reference will still cause it to re-render, even if the logic inside the
        function is identical.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      {/* DIDACTIC: CHILD FOCUS */}
      <p>
        In the example above, the child component receives a callback as a prop. When{' '}
        <code>useCallback</code> is enabled, the function reference stays the same across
        parent re-renders, so the child does <strong>not</strong> re-render.
      </p>

      <p>
        When <code>useCallback</code> is disabled, a new function is created on every
        parent render. Even if the child is memoized, React sees the prop as “changed” and
        re-renders the child.
      </p>

      {/* CHILD LEVEL EXPLANATION */}
      <p>
        <strong>Like explaining to a child:</strong> imagine giving someone a remote
        control. If you hand them the <em>same</em> remote every time, they know nothing
        changed. If you give them a <em>new</em> remote each time, they think something is
        different — even if the buttons do the same things.
      </p>

      <p>
        <code>useCallback</code> makes sure you keep giving the same remote, until the
        buttons actually need to change.
      </p>
    </ExplainCard>
  )
}
