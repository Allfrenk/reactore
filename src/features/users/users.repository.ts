import { db } from '@/core/firebase/firebase'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import type { HooksState } from '@/state/hooksSlice'
import { createUserRecord } from './users.schema'
import type { AuthProvider, UserRole } from './users.types'

type UpsertUserParams = {
  uid: string
  displayName: string
  email: string | null
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
  })
}

// ✅ già ok: la tua getUserHooks tipizzata/normalizzata resta
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

// ✅ NUOVA: persiste TUTTI gli hooks nello user doc
export async function updateUserHooks(uid: string, hooks: HooksState['data']) {
  const ref = doc(db, 'users', uid)

  await updateDoc(ref, {
    hooks,
    lastLoginAt: serverTimestamp(),
  })
}
