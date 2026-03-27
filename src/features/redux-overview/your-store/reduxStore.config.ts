// src/features/redux-overview/your-store/reduxStore.config.ts

import type { RootState } from '@/core/app/store'

export type ReduxStoreItem = {
  key: string
  title: string
  description: string
  selector: (state: RootState) => string
  to: string
}

export type LocalHookItem = {
  key: string
  title: string
  description: string
  to: string
}

// Hooks whose state is persisted in the Redux store
export const reduxHooksConfig: ReduxStoreItem[] = [
  {
    key: 'useState',
    title: 'useState',
    description: 'Manages local component state.',
    selector: state => state.hooks.data.useState.value,
    to: '/hooks/useState',
  },
  {
    key: 'useEffect',
    title: 'useEffect',
    description: 'Handles side effects and lifecycle logic.',
    selector: state => state.hooks.data.useEffect.value,
    to: '/hooks/useEffect',
  },
  {
    key: 'useMemo',
    title: 'useMemo',
    description: 'Memoizes computed values.',
    selector: state => state.hooks.data.useMemo.value,
    to: '/hooks/useMemo',
  },
  {
    key: 'useCallback',
    title: 'useCallback',
    description: 'Memoizes callback functions.',
    selector: state => state.hooks.data.useCallback.value,
    to: '/hooks/useCallback',
  },
]

// Hooks whose demos use local component state — not persisted in the store
export const localHooksConfig: LocalHookItem[] = [
  {
    key: 'useRef',
    title: 'useRef',
    description: 'DOM access and mutable values — session only.',
    to: '/hooks/useRef',
  },
  {
    key: 'useReducer',
    title: 'useReducer',
    description: 'Reducer-driven counter — session only.',
    to: '/hooks/useReducer',
  },
  {
    key: 'useContext',
    title: 'useContext',
    description: 'Shared context across a subtree — session only.',
    to: '/hooks/useContext',
  },
]
