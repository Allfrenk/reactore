import { auth } from '@/lib/firebase/firebase'
import { trackAnalyticsEvent } from '@/lib/telemetry/firebaseAnalytics'
import { upsertUser } from '@/lib/users/users.repository'
import { signInWithPopup, signOut } from 'firebase/auth'
import { githubProvider, googleProvider } from './auth.providers'

export const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    name: user.displayName ?? 'User',
    email: user.email,
    role: 'user',
    provider: 'google',
  })

  await trackAnalyticsEvent('login', {
    provider: 'google',
    role: 'user',
  })

  return res
}

export const loginWithGithub = async () => {
  const res = await signInWithPopup(auth, githubProvider)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    name: user.displayName ?? 'User',
    email: user.email,
    role: 'user',
    provider: 'github',
  })

  await trackAnalyticsEvent('login', {
    provider: 'github',
    role: 'user',
  })

  return res
}

export const logout = () => signOut(auth)
