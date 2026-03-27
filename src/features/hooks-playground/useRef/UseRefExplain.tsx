import { ExplainCard } from '@/shared/components/cards/ExplainCard'
import { useRefConfig } from '../config/useRef.config'

export function UseRefExplain() {
  const { title, subtitle, codeExample } = useRefConfig.explain

  return (
    <ExplainCard title={title} subtitle={subtitle}>
      <p>
        <code>useRef</code> returns a plain object <code>{'{ current: value }'}</code>{' '}
        that React keeps alive for the entire lifetime of the component. Unlike state,
        writing to <code>ref.current</code> does <strong>not trigger a re-render</strong>{' '}
        — React simply does not know it changed.
      </p>

      <p>
        This one hook serves two distinct purposes. The first is{' '}
        <strong>imperative DOM access</strong>: attaching a ref to a JSX element makes{' '}
        <code>ref.current</code> point to the real DOM node. You can then call{' '}
        <code>.focus()</code>, <code>.scrollIntoView()</code>, or read layout dimensions
        — without any state update or re-render.
      </p>

      <p>
        The second purpose is storing a{' '}
        <strong>mutable value that persists across renders</strong> but never needs to
        appear on screen. Classic examples: the ID returned by <code>setInterval</code>{' '}
        (so you can clear it later), a previous prop value for comparison, or a render
        counter that you only read in dev tools.
      </p>

      <pre className="glass-inset overflow-x-auto p-3 text-xs">
        <code>{codeExample}</code>
      </pre>

      <p>
        <strong>Rule:</strong> never read or write <code>ref.current</code> during the
        render phase. Refs are for effects and event handlers only — reading them during
        render makes the output unpredictable and breaks React's guarantees.
      </p>

      <p>
        <strong>Like explaining to a child:</strong> the whiteboard in class is React —
        every time the teacher rewrites something, everyone sees the update. A{' '}
        <code>useRef</code> is a small notebook you keep in your pocket. You can scribble
        notes, cross things out, and read them whenever you want, but the teacher never
        looks at your notebook when deciding what to write on the board.
      </p>
    </ExplainCard>
  )
}
