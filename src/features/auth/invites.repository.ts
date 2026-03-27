import { db } from '@/core/firebase/firebase'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import type { InviteRecord } from './invites.types'

export class InviteError extends Error {
  readonly code: string

  constructor(code: string) {
    super(code)
    this.name = 'InviteError'
    this.code = code
  }
}

export async function validateInvite(rawCode: string): Promise<InviteRecord> {
  const code = rawCode.trim().toUpperCase()
  const ref = doc(db, 'invites', code)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    throw new InviteError('invite/not-found')
  }

  const data = snap.data() as InviteRecord

  if (data.used) {
    throw new InviteError('invite/already-used')
  }

  if (data.expiresAt) {
    const expiry = data.expiresAt.toDate()
    if (expiry < new Date()) {
      throw new InviteError('invite/expired')
    }
  }

  return data
}

export async function markInviteUsed(rawCode: string, uid: string): Promise<void> {
  const code = rawCode.trim().toUpperCase()
  const ref = doc(db, 'invites', code)
  await updateDoc(ref, {
    used: true,
    usedBy: uid,
    usedAt: serverTimestamp(),
  })
}
