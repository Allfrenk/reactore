export const useCallbackConfig = {
  meta: {
    title: 'useCallback',
    description:
      'Optimize child components by memoizing function references passed as props.',
  },
  action: {
    title: 'Function identity',
    subtitle: 'Why callbacks cause unnecessary re-renders',
  },
  explain: {
    title: 'What useCallback does',
    subtitle: 'Memoizing functions instead of values',
    codeExample: `const increment = useCallback(() => {
  setCount(c => c + 1)
}, [])`,
  },
}
