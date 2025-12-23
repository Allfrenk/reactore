import { db } from '@/lib/firebase/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export type UserRole = 'user' | 'recruiter'
export type AuthProvider = 'google' | 'github' | 'recruiter'

export type UserDoc = {
  uid: string
  name: string
  email: string | null
  role: UserRole
  provider: AuthProvider
}

export async function upsertUser(user: UserDoc) {
  const ref = doc(db, 'users', user.uid)

  await setDoc(
    ref,
    {
      ...user,
      lastLoginAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  )
}
