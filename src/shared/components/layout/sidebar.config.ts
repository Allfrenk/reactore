import type { LucideIcon } from 'lucide-react'
import { Box, CircuitBoard, Home, Link } from 'lucide-react'

type SidebarItem = {
  type: 'item'
  label: string
  to: string
  icon: LucideIcon
}

type SidebarGroup = {
  type: 'group'
  label: string
  basePath: string
  to: string // 👈 nuovo
  icon: LucideIcon
  children: Array<{
    label: string
    to: string
    badge?: string
  }>
}

export const sidebarConfig: Array<SidebarItem | SidebarGroup> = [
  {
    type: 'item',
    label: 'Home',
    to: '/',
    icon: Home,
  },
  {
    type: 'group',
    label: 'Hooks Playground',
    basePath: '/hooks',
    to: '/hooks/useState', // 👈 click porta al primo hook
    icon: Link,
    children: [
      { label: 'useState', to: '/hooks/useState' },
      { label: 'useEffect', to: '/hooks/useEffect' },
      { label: 'useMemo', to: '/hooks/useMemo' },
      { label: 'useCallback', to: '/hooks/useCallback' },
      { label: 'useRef', to: '/hooks/useRef', badge: 'new' },
      { label: 'useReducer', to: '/hooks/useReducer', badge: 'new' },
      { label: 'useContext', to: '/hooks/useContext', badge: 'new' },
    ],
  },
  {
    type: 'group',
    label: 'Redux Overview',
    basePath: '/redux',
    to: '/redux/your-store', // 👈 entry point
    icon: Box,
    children: [
      // {
      //   label: 'What is Redux',
      //   to: '/redux/what-is-redux',
      //   badge: 'new',
      // },
      {
        label: 'Your Store',
        to: '/redux/your-store',
        badge: 'new',
      },
    ],
  },
  {
    type: 'item',
    label: 'Under the Hood',
    to: '/stack',
    icon: CircuitBoard,
  },
] as const
