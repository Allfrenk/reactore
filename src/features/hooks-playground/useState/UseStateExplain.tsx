import { useStateConfig } from '@/features/hooks-playground/config/useState.config'
import { ExplainCard } from '@/shared/components/cards/ExplainCard'

export function UseStateExplain() {
  const { title, subtitle, codeExample } = useStateConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      {/* TECHNICAL EXPLANATION */}
      <p>
        <code>useState</code> allows a function component to store and update local state.
        It returns a pair: the current state value and a setter function used to schedule
        updates.
      </p>

      <p>
        Calling the setter does <strong>not</strong> update the value immediately.
        Instead, React schedules a re-render with the new state. During this process,
        React may batch multiple updates together to keep rendering efficient.
      </p>

      <p>
        When the new state depends on the previous one, the functional form of the setter
        should be used. This guarantees that you always work with the latest value, even
        if multiple updates happen close together.
      </p>

      <p className="mt-2">The core pattern looks like this:</p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      {/* SIMILITUDE FOR A CHILD */}
      <p>
        <strong>Like explaining to a child:</strong> imagine your component is a box with
        a number written on it. <code>useState</code> lets you look at the number and
        gives you a button to change it. When you press the button, React doesn’t change
        the number instantly — it redraws the whole box with the new number on it. Using
        the functional form is like saying “take whatever number is written now and add
        one”, instead of guessing what the number was before.
      </p>
    </ExplainCard>
  )
}
