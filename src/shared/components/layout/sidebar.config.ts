import type { LucideIcon } from 'lucide-react'
import { Code2, Home } from 'lucide-react'

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
    ],
  },
] as const
