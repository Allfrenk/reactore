import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/core/app/hooks'
import { trackAnalyticsEvent } from '@/core/firebase/analytics'
import { auth } from '@/core/firebase/firebase'
import { clearThemeSelected } from '@/state/themeSlice'
import { clearUser, setUserAuth } from '@/state/userSlice'

type AuthBootstrapProps = {
  children: React.ReactNode
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const dispatch = useAppDispatch()
  const loginTrackedRef = useRef(false)
  const coopInfoLoggedRef = useRef(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (import.meta.env.DEV && !coopInfoLoggedRef.current) {
        coopInfoLoggedRef.current = true

        console.info(
          '%c[Auth Info]',
          'color:#22c55e;font-weight:700',
          'OAuth popup login may emit Cross-Origin-Opener-Policy warnings in Chrome DevTools.\n' +
            'This is a known Firebase Auth + browser behavior and does NOT affect authentication, security, or analytics.\n' +
            'No action required.'
        )
      }

      if (user) {
        dispatch(
          setUserAuth({
            uid: user.uid,
            displayName: user.displayName,
          })
        )

        // 📊 analytics login (UNA SOLA VOLTA)
        if (!loginTrackedRef.current) {
          loginTrackedRef.current = true

          void trackAnalyticsEvent('login', {
            provider: user.providerData[0]?.providerId ?? 'anonymous',
            uid: user.uid,
          })
        }
      } else {
        // 🔁 logout / session expired
        loginTrackedRef.current = false
        dispatch(clearUser())
        dispatch(clearThemeSelected())
      }
    })

    return unsubscribe
  }, [dispatch])

  return <>{children}</>
}
