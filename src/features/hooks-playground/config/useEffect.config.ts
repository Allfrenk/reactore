export const useEffectConfig = {
  meta: {
    title: 'useEffect',
    description: 'Synchronize your component with side effects and external systems.',
  },

  action: {
    title: 'Live timer',
    subtitle: 'A side effect that needs setup and cleanup',
  },

  explain: {
    title: 'Understanding useEffect',
    subtitle: 'Effects, dependencies and cleanup',
    codeExample: `useEffect(() => {
  if (!isRunning) return

  const id = setInterval(() => {
    setTime(t => t + 1)
  }, 1000)

  return () => clearInterval(id)
}, [isRunning])`,
  },
} as const
