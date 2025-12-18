import { Code2, Home } from 'lucide-react'

export const sidebarConfig = [
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
    icon: Code2,
    children: [
      {
        label: 'useState',
        to: '/hooks/use-state',
      },
      // future:
      // { label: 'useEffect', to: '/hooks/use-effect' }
    ],
  },
] as const
