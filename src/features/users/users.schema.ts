import { serverTimestamp } from 'firebase/firestore'
import type { AuthProvider, UserRole } from './users.types'

export type UserProfile = {
  displayName: string
  company: string
}

export type UserHooks = {
  useState: { value: string }
  useEffect: { value: string }
  useMemo: { value: string }
  useCallback: { value: string }
}

export type UserRecord = {
  uid: string
  role: UserRole
  provider: AuthProvider
  email: string
  profile: UserProfile
  hooks?: UserHooks
  createdAt: unknown
  lastLoginAt: unknown
  loginCount: number
}

export function createUserRecord(params: {
  uid: string
  displayName: string
  company: string
  email: string
  role: UserRole
  provider: AuthProvider
}): UserRecord {
  const base: UserRecord = {
    uid: params.uid,
    role: params.role,
    provider: params.provider,
    email: params.email,
    profile: {
      displayName: params.displayName,
      company: params.company,
    },
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    loginCount: 1,
  }

  // ✅ hooks SOLO per utenti standard
  if (params.role === 'user') {
    base.hooks = {
      useState: { value: '0' },
      useEffect: { value: '0' },
      useMemo: { value: '0' },
      useCallback: { value: '0' },
    }
  }

  return base
}
