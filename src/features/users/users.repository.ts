import { db } from '@/core/firebase/firebase'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import type { HooksState } from '@/state/hooksSlice'
import type { UserRecord } from './users.schema'
import { createUserRecord } from './users.schema'
import type { AuthProvider, UserRole } from './users.types'

type UpsertUserParams = {
  uid: string
  displayName: string
  company: string
  email: string
  role: UserRole
  provider: AuthProvider
}

export async function upsertUser(params: UpsertUserParams) {
  const ref = doc(db, 'users', params.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    const record = createUserRecord(params)
    await setDoc(ref, record)
    return
  }

  await updateDoc(ref, {
    lastLoginAt: serverTimestamp(),
    loginCount: (snap.data().loginCount ?? 0) + 1,
    'profile.displayName': params.displayName,
    'profile.company': params.company,
    email: params.email,
    role: params.role,
    provider: params.provider,
  })
}

export async function ensureUserRecord(params: UpsertUserParams): Promise<UserRecord> {
  const ref = doc(db, 'users', params.uid)
  const snap = await getDoc(ref)

  // 🔹 CASO 1: non esiste → creo
  if (!snap.exists()) {
    const record = createUserRecord(params)
    await setDoc(ref, record)
    return record
  }

  const existing = snap.data() as UserRecord

  // 🔹 CASO 2: esiste → aggiorno SOLO metadata tecnici
  await updateDoc(ref, {
    lastLoginAt: serverTimestamp(),
    loginCount: (existing.loginCount ?? 0) + 1,
  })

  return {
    ...existing,
    loginCount: (existing.loginCount ?? 0) + 1,
    lastLoginAt: existing.lastLoginAt,
  }
}

export async function getUserRecord(uid: string): Promise<UserRecord | null> {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return snap.data() as UserRecord
}

export async function getUserHooks(uid: string): Promise<HooksState['data'] | null> {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null

  const raw = snap.data().hooks as unknown
  if (typeof raw !== 'object' || raw === null) return null

  const hooks = raw as Partial<HooksState['data']>

  return {
    useState: hooks.useState ?? { value: '0' },
    useEffect: hooks.useEffect ?? { value: '0' },
    useMemo: hooks.useMemo ?? { value: '0' },
    useCallback: hooks.useCallback ?? { value: '0' },
  }
}

export async function updateUserHooks(uid: string, hooks: HooksState['data']) {
  const ref = doc(db, 'users', uid)
  await updateDoc(ref, {
    hooks,
    lastLoginAt: serverTimestamp(),
  })
}
