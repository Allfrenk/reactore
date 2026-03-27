export const useReducerConfig = {
  meta: {
    title: 'useReducer',
    description:
      'Manage complex state transitions with a reducer function — a more structured alternative to useState.',
  },

  action: {
    title: 'Reducer-driven counter',
    subtitle: 'State transitions via dispatched actions',
  },

  explain: {
    title: 'How useReducer works',
    subtitle: 'Predictable state via pure functions',
    codeExample: `type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return Math.max(0, state - 1)
    case 'RESET':     return 0
  }
}

const [count, dispatch] = useReducer(reducer, 0)
dispatch({ type: 'INCREMENT' })`,
  },
} as const
