export const useMemoConfig = {
  meta: {
    title: 'useMemo',
    description:
      'Optimize expensive computations by memoizing their result and avoiding unnecessary recalculations.',
  },

  action: {
    title: 'Memoized computation',
    subtitle:
      'Toggle useMemo and observe how React recalculates (or not) an expensive function.',
  },

  explain: {
    title: 'How useMemo works',
    subtitle: 'Memoization for performance optimization',

    codeExample: `const result = useMemo(() => {
  return expensiveComputation(input)
}, [input])`,
  },
}
