import { ExplainCard } from '@/components/cards/explainCard/ExplainCard'
import { useStateConfig } from '@/configs/hookConfig/useState.config'

export function UseStateExplain() {
  const { title, subtitle, codeExample } = useStateConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useState</code> lets you add local state to a function component. It returns
        the current state value and a setter function.
      </p>

      <p>
        Calling the setter schedules a re-render with the new state value. React batches
        updates to keep rendering efficient.
      </p>

      <p>Using the functional form:</p>

      <pre className="glass-inset p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        guarantees you always work with the latest state, even when multiple updates
        happen in quick succession.
      </p>
    </ExplainCard>
  )
}
