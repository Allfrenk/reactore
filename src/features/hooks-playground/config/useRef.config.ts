export const useRefConfig = {
  meta: {
    title: 'useRef',
    description:
      'Access DOM nodes directly and persist mutable values across renders without triggering a re-render.',
  },

  action: {
    title: 'DOM access & mutable value',
    subtitle: 'Two faces of the same hook',
  },

  explain: {
    title: 'How useRef works',
    subtitle: 'A box that persists across renders',
    codeExample: `// DOM access
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current.focus()

// Mutable value — no re-render
const countRef = useRef(0)
countRef.current += 1`,
  },
} as const
