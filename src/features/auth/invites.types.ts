import type { Timestamp } from 'firebase/firestore'

export type InviteRecord = {
  used: boolean
  usedBy: string | null
  usedAt: Timestamp | null
  createdAt: Timestamp
  expiresAt: Timestamp | null
}
