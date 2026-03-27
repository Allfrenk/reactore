import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useReducerConfig } from '../config/useReducer.config'

export function UseReducerExplain() {
  const { title, subtitle, codeExample } = useReducerConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useReducer</code> is an alternative to <code>useState</code> that separates{' '}
        <em>what happened</em> from <em>how the state changes</em>. Instead of calling a
        setter with a new value, you <strong>dispatch an action</strong> — a plain object
        describing an event. A pure <strong>reducer function</strong> then takes the
        current state and that action and returns the next state.
      </p>

      <p>
        The reducer is just <code>(state, action) =&gt; newState</code>. It is pure: same
        inputs always produce the same output, with no side effects. This makes it{' '}
        <strong>independently testable</strong> — you can import and test the reducer
        function in complete isolation from React.
      </p>

      <p>
        This pattern becomes valuable when transitions have explicit names, when multiple
        fields change together in response to a single event, or when the state logic is
        complex enough that it deserves to live outside the component. It is also the
        direct conceptual predecessor of Redux.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>When to choose useReducer over useState:</strong> if you find yourself
        writing several related setters that need to change together, or if you want to
        give your state transitions clear, searchable names — that is the signal to
        switch.
      </p>

      <p>
        <strong>Like explaining to a child:</strong> think of a vending machine. You don't
        open the back and rearrange the cans yourself — you press a button. The machine
        (the reducer) reads which button you pressed (the action) and decides what falls
        out (the new state). You always get a predictable result from the same button, and
        the machine's logic is completely contained inside the box.
      </p>
    </ExplainCard>
  )
}
