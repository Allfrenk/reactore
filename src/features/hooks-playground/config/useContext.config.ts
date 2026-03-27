export const useContextConfig = {
  meta: {
    title: 'useContext',
    description:
      'Share state across a component tree without prop drilling — any descendant can read and react to context changes.',
  },

  action: {
    title: 'Shared context, no props',
    subtitle: 'Provider → Consumer without prop drilling',
  },

  explain: {
    title: 'How useContext works',
    subtitle: 'Global-ish state within a subtree',
    codeExample: `const ThemeCtx = createContext<'light' | 'dark'>('light')

function Parent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <ThemeCtx.Provider value={theme}>
      <ChildA />
      <ChildB />
    </ThemeCtx.Provider>
  )
}

function ChildA() {
  const theme = useContext(ThemeCtx) // no props needed
}`,
  },
} as const
