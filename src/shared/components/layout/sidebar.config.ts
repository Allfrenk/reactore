import type { LucideIcon } from 'lucide-react'
import { Code2, Home, Layers } from 'lucide-react'

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
    icon: Code2,
    children: [
      { label: 'useState', to: '/hooks/useState' },
      { label: 'useEffect', to: '/hooks/useEffect' },
      { label: 'useMemo', to: '/hooks/useMemo', badge: 'new' },
      { label: 'useCallback', to: '/hooks/useCallback', badge: 'new' },
    ],
  },
  {
    type: 'group',
    label: 'Redux Overview',
    basePath: '/redux',
    to: '/redux/what-is-redux', // 👈 entry point
    icon: Layers,
    children: [
      {
        label: 'What is Redux',
        to: '/redux/what-is-redux',
        badge: 'new',
      },
      {
        label: 'Your Store',
        to: '/redux/your-store',
        badge: 'new',
      },
    ],
  },
] as const
