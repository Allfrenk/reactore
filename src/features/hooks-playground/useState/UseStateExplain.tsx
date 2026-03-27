import { useStateConfig } from '@/features/hooks-playground/config/useState.config'
import { ExplainCard } from '@/shared/components/cards/ExplainCard'

export function UseStateExplain() {
  const { title, subtitle, codeExample } = useStateConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useState</code> lets a function component hold a value between renders and
        update it over time. It returns two things: the current value and a setter
        function that tells React "something changed, re-render with this new value".
      </p>

      <p>
        Calling the setter does <strong>not</strong> update the variable immediately.
        React schedules a re-render and applies the new value on the next paint. If you
        call the setter multiple times in the same event handler, React batches those
        updates into a single re-render.
      </p>

      <p>
        When the new value depends on the previous one, always use the{' '}
        <strong>updater function form</strong>: <code>setCount(prev =&gt; prev + 1)</code>
        . This guarantees you work with the latest value, even when updates are batched.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>Like explaining to a child:</strong> think of <code>useState</code> as a
        scoreboard on the wall. You can look at it anytime, but you cannot erase and
        rewrite it yourself — you have to ask the scorekeeper (React). The scorekeeper
        doesn't change it mid-game; they wait until the right moment, then redraw the
        whole board with the new number. If you ask to add one point twice before the
        board updates, using the updater form is like saying "add one to whatever is
        already there" — so you never lose a point.
      </p>
    </ExplainCard>
  )
}
