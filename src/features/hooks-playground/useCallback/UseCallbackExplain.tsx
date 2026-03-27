import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useCallbackConfig } from '../config/useCallback.config'

export function UseCallbackExplain() {
  const { title, subtitle, codeExample } = useCallbackConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        In JavaScript, every time a function is declared it creates a{' '}
        <strong>new object in memory</strong>. This means that on every render, a function
        defined inside a component gets a brand-new reference — even if its code is
        identical to the one from the previous render.
      </p>

      <p>
        This only becomes a problem when you pass that function as a prop to a memoized
        child (one wrapped in <code>React.memo</code>). The child compares its previous
        props with the new ones. If the function reference changed, the comparison fails
        and the child re-renders — even though nothing actually changed in behaviour.
      </p>

      <p>
        <code>useCallback</code> solves this by returning the{' '}
        <strong>same function reference</strong> across renders, as long as its
        dependencies stay the same. The memoized child sees the same prop it had before
        and skips the re-render.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>Don't overuse it.</strong> If the child is not memoized, or if the
        function changes on every render anyway (because a dependency changes), wrapping
        it in <code>useCallback</code> adds overhead with no benefit.
      </p>

      <p>
        <strong>Like explaining to a child:</strong> you give your friend a remote control
        for the TV. Every time you walk into the room you hand them a new remote —
        identical buttons, same channels — but they think something changed and re-read
        the whole manual. <code>useCallback</code> makes sure you hand them the{' '}
        <em>same physical remote</em> every time. Only when you genuinely need to add a
        new button do you swap it for a different one.
      </p>
    </ExplainCard>
  )
}
