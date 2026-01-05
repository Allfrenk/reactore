import { db } from '@/core/firebase/firebase'
import type { HooksState } from '@/state/hooksSlice'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
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

export async function getUserHooks(uid: string): Promise<HooksState['data'] | null> {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return null
  }

  // 🔐 boundary Firestore → unknown
  const raw = snap.data().hooks as unknown

  // 🔎 runtime check minimo
  if (typeof raw !== 'object' || raw === null) {
    return null
  }

  const hooks = raw as Partial<HooksState['data']>

  return {
    useState: hooks.useState ?? { value: '0' },
    useEffect: hooks.useEffect ?? { value: '0' },
    useMemo: hooks.useMemo ?? { value: '0' },
    useCallback: hooks.useCallback ?? { value: '0' },
  }
}
