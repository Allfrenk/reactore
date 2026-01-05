import { auth } from '@/core/firebase/firebase'
import { upsertUser } from '@/features/users/users.repository'
import { signInAnonymously, signInWithPopup, signOut } from 'firebase/auth'
import { githubProvider, googleProvider } from './auth.providers'

export const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    displayName: user.displayName ?? 'User',
    email: user.email,
    role: 'user',
    provider: 'google',
  })

  return res
}

export const loginWithGithub = async () => {
  const res = await signInWithPopup(auth, githubProvider)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    displayName: user.displayName ?? 'User',
    email: user.email,
    role: 'user',
    provider: 'github',
  })

  return res
}

export const loginAsRecruiter = async () => {
  const res = await signInAnonymously(auth)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    displayName: 'Recruiter',
    email: null,
    role: 'recruiter',
    provider: 'recruiter',
  })

  return res
}

export const logout = () => signOut(auth)
