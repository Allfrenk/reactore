import { useEffectConfig } from '@/features/hooks-playground/config/useEffect.config'
import { ExplainCard } from '@/shared/components/cards/ExplainCard'

export function UseEffectExplain() {
  const { title, subtitle, codeExample } = useEffectConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      {/* TECHNICAL */}
      <p>
        <code>useEffect</code> runs <strong>after</strong> React has rendered your
        component. It is the right place to synchronize your UI with things outside the
        render phase (timers, subscriptions, DOM APIs, network calls).
      </p>

      <p>
        The <strong>dependency array</strong> controls when the effect is re-executed. In
        this example we depend on <code>isRunning</code>: when it becomes{' '}
        <code>true</code> we create a timer; when it becomes <code>false</code> we stop
        it.
      </p>

      <p>
        The function returned by the effect is the <strong>cleanup</strong>. React calls
        it before re-running the effect and when the component unmounts. Without cleanup,
        you would keep creating intervals and the timer would speed up and leak resources.
      </p>

      <p className="mt-2">The core pattern looks like this:</p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      {/* SIMPLE SIMILITUDE */}
      <p>
        <strong>Like explaining to a child:</strong> imagine your component is a room.
        Rendering is just drawing the room. <code>useEffect</code> is what you do{' '}
        <em>after</em> the room is ready: you turn on a fan (the timer). The dependency
        array is the switch: when it’s ON, the fan runs; when it’s OFF, it stops. Cleanup
        is remembering to turn the fan OFF before leaving the room — otherwise it keeps
        running forever.
      </p>
    </ExplainCard>
  )
}
