import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/core/app/hooks'
import { trackAnalyticsEvent } from '@/core/firebase/analytics'
import { auth } from '@/core/firebase/firebase'
import { ensureUserRecord, getUserHooks } from '@/features/users/users.repository'
import type { AuthProvider } from '@/features/users/users.types'
import { hydrateHooks } from '@/state/hooksSlice'
import { clearThemeSelected } from '@/state/themeSlice'
import { clearUser, setAuthReady, setUserAuth } from '@/state/userSlice'

type AuthBootstrapProps = {
  children: React.ReactNode
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const dispatch = useAppDispatch()
  const loginTrackedRef = useRef(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (!firebaseUser) {
        loginTrackedRef.current = false
        dispatch(clearUser())
        dispatch(clearThemeSelected())
        dispatch(setAuthReady())
        return
      }

      void (async () => {
        const providerId = firebaseUser.providerData[0]?.providerId

        const record = await ensureUserRecord({
          uid: firebaseUser.uid,
          displayName: 'IGNORED',
          company: 'IGNORED',
          email: firebaseUser.email ?? '',
          role: providerId === 'password' ? 'recruiter' : 'user',
          provider: (providerId === 'password'
            ? 'recruiter'
            : (providerId ?? 'unknown')) as AuthProvider,
        })

        dispatch(
          setUserAuth({
            uid: record.uid,
            displayName: record.profile.displayName,
            role: record.role,
            company: record.profile.company,
          })
        )

        if (record.role === 'user') {
          const hooks = await getUserHooks(record.uid)
          if (hooks) dispatch(hydrateHooks(hooks))
        }

        if (!loginTrackedRef.current) {
          loginTrackedRef.current = true
          void trackAnalyticsEvent('login', {
            uid: record.uid,
            role: record.role,
            provider: record.provider,
            company: record.profile.company,
          })
        }

        dispatch(setAuthReady())
      })().catch(err => {
        console.error('[AuthBootstrap] Fatal error', err)
        dispatch(setAuthReady())
      })
    })

    return unsubscribe
  }, [dispatch])

  return <>{children}</>
}
