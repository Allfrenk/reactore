import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useContextConfig } from '../config/useContext.config'

export function UseContextExplain() {
  const { title, subtitle, codeExample } = useContextConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useContext</code> lets any component in a tree read a shared value without
        receiving it through props. You create a context with <code>createContext</code>,
        wrap a subtree in a <code>Provider</code> with a value, and any descendant —
        regardless of how many layers deep — can read that value with{' '}
        <code>useContext</code>.
      </p>

      <p>
        When the value inside the Provider changes, React re-renders{' '}
        <strong>every component that consumes that context</strong>. There is no
        selector: if you wrap a large object in a single context and change one field, all
        consumers re-render — even those that only care about a different field. For
        fine-grained subscriptions, a dedicated state manager like Redux is more
        efficient.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>Context vs props:</strong> props are explicit and easy to trace — prefer
        them when data flows one or two levels. Reach for context when the same value is
        needed across many components at different depths, and updating it through every
        intermediate layer (prop drilling) would make the code harder to maintain.
      </p>

      <p>
        <strong>Context vs Redux:</strong> context is built into React and requires no
        extra library — it is ideal for low-frequency values like theme or locale. Redux
        is better when state updates happen often, when you need time-travel debugging, or
        when many unrelated parts of the app share the same data.
      </p>

      <p>
        <strong>Like explaining to a child:</strong> imagine the school intercom. The
        principal makes one announcement and every classroom hears it at the same time —
        no teacher has to walk room to room passing the message. The intercom is the
        Provider; each classroom is a consumer. If the principal says something new, every
        room hears it instantly — even the ones that did not need that particular
        announcement.
      </p>
    </ExplainCard>
  )
}
