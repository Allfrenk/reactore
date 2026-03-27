import { useEffectConfig } from '@/features/hooks-playground/config/useEffect.config'
import { ExplainCard } from '@/shared/components/cards/ExplainCard'

export function UseEffectExplain() {
  const { title, subtitle, codeExample } = useEffectConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useEffect</code> runs <strong>after</strong> React has painted the screen.
        It is the right place for code that needs to reach outside React: starting a
        timer, subscribing to an event, fetching data, or directly touching the DOM.
      </p>

      <p>
        The <strong>dependency array</strong> controls when the effect re-runs. An empty
        array <code>[]</code> means "run once, on mount". Listing a variable means "re-run
        every time that variable changes". In this demo we depend on{' '}
        <code>isRunning</code>: the interval starts when it turns <code>true</code> and
        stops when it turns <code>false</code>.
      </p>

      <p>
        The function you <strong>return</strong> from the effect is the{' '}
        <strong>cleanup</strong>. React calls it before running the effect again and when
        the component unmounts. Without it, every re-run would create a new interval on
        top of the old one — the timer would tick faster and faster, leaking memory.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>Like explaining to a child:</strong> imagine your component is a kitchen.
        Every time you enter, you boil water (the effect). The dependency array is the
        rule for when you actually do it — maybe only when the kettle is empty. The
        cleanup is unplugging the kettle before you leave: if you forget, the next person
        who enters finds it already boiling and plugs in a second one, then a third, and
        the kitchen catches fire.
      </p>
    </ExplainCard>
  )
}
