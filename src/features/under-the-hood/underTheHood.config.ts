import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  Cloud,
  Database,
  FileCode2,
  Flame,
  FlaskConical,
  FolderTree,
  Gauge,
  Layers,
  PackageOpen,
  Route,
  Shapes,
  ShieldCheck,
  Wind,
  Zap,
} from 'lucide-react'

export type TechCategory = 'runtime' | 'build' | 'infra' | 'testing'

export type TechItem = {
  name: string
  version: string
  category: TechCategory
  color: string
  icon: LucideIcon
  description: string
}

export type ArchItem = {
  icon: LucideIcon
  title: string
  description: string
}

export const techStack: TechItem[] = [
  {
    name: 'React',
    version: '19',
    category: 'runtime',
    color: '#61DAFB',
    icon: Atom,
    description: 'UI library driving every component and hook in the playground.',
  },
  {
    name: 'TypeScript',
    version: '5.9',
    category: 'build',
    color: '#3178C6',
    icon: FileCode2,
    description: 'Strict mode — no any, explicit return types, full structural type safety.',
  },
  {
    name: 'Vite',
    version: '7',
    category: 'build',
    color: '#646CFF',
    icon: Zap,
    description: 'Sub-second HMR via SWC compilation, optimised prod builds with Rollup.',
  },
  {
    name: 'Redux Toolkit',
    version: '2',
    category: 'runtime',
    color: '#764ABC',
    icon: Layers,
    description: 'createSlice and Immer eliminate boilerplate — the live store powers the Redux page.',
  },
  {
    name: 'React Router',
    version: '7',
    category: 'runtime',
    color: '#CA4245',
    icon: Route,
    description: 'Declarative routing with lazy-loaded route segments for a minimal initial bundle.',
  },
  {
    name: 'Tailwind CSS',
    version: '4',
    category: 'build',
    color: '#06B6D4',
    icon: Wind,
    description: 'Utility-first CSS with the v4 Vite plugin — zero PostCSS config, full JIT.',
  },
  {
    name: 'Firebase',
    version: '12',
    category: 'infra',
    color: '#FFCA28',
    icon: Flame,
    description: 'Google/GitHub OAuth, email auth, Firestore, and hosting — zero custom backend.',
  },
  {
    name: 'Vitest',
    version: '4',
    category: 'testing',
    color: '#6E9F18',
    icon: FlaskConical,
    description: 'Component and unit tests with React Testing Library, V8 coverage reporter.',
  },
  {
    name: 'Lucide React',
    version: '0.562',
    category: 'runtime',
    color: '#F97316',
    icon: Shapes,
    description: 'Consistent, tree-shakeable SVG icons — unused icons ship 0 bytes in the bundle.',
  },
]

export const architectureDecisions: ArchItem[] = [
  {
    icon: FolderTree,
    title: 'Feature-first structure',
    description:
      'Each feature owns its components, config, hooks, and tests. No shared barrel exports that create circular dependencies.',
  },
  {
    icon: PackageOpen,
    title: 'Route-based lazy loading',
    description:
      'Every page module is a separate JS chunk. The initial payload covers the app shell, auth layer, and vendor libraries — page content arrives on demand as you navigate.',
  },
  {
    icon: Database,
    title: 'Redux Toolkit',
    description:
      "RTK's createSlice removes action-type boilerplate. Immer lets reducers use mutation syntax while keeping state immutable.",
  },
  {
    icon: Cloud,
    title: 'Firebase — zero backend',
    description:
      'Google/GitHub OAuth and email auth with no server code. Firestore syncs hook interaction state across sessions; Firebase Hosting serves the SPA.',
  },
  {
    icon: Gauge,
    title: 'Vite + SWC compilation',
    description:
      'SWC compiles TypeScript ~20× faster than Babel. Manual Rollup chunks keep vendor code separate for better long-term caching.',
  },
  {
    icon: ShieldCheck,
    title: 'Demo + Recruiter modes',
    description:
      'Demo mode is pure Redux — no Firebase writes, session-only. Recruiter mode authenticates against Firebase with email + password.',
  },
]
