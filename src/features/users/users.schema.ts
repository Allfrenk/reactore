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
  email: string | null
  profile: UserProfile
  hooks?: UserHooks
  createdAt: unknown
  lastLoginAt: unknown
  loginCount: number
}

export function createUserRecord(params: {
  uid: string
  displayName: string
  email: string | null
  role: UserRole
  provider: AuthProvider
}): UserRecord {
  const isUser = params.role === 'user'

  return {
    uid: params.uid,
    role: params.role,
    provider: params.provider,
    email: params.email,
    profile: {
      displayName: params.displayName,
      company: '',
    },
    hooks: isUser
      ? {
          useState: { value: '0' },
          useEffect: { value: '0' },
          useMemo: { value: '0' },
          useCallback: { value: '0' },
        }
      : undefined,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    loginCount: 1,
  }
}
