import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { auth } from '@/lib/firebase/firebase'
import { trackAnalyticsEvent } from '@/lib/telemetry/firebaseAnalytics'
import { clearThemeSelected } from '@/slices/themeSlice'
import { clearUser, setUserAuth } from '@/slices/userSlice'

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
