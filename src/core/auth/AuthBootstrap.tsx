import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/core/app/hooks'
import { trackAnalyticsEvent } from '@/core/firebase/analytics'
import { auth } from '@/core/firebase/firebase'
import { clearThemeSelected } from '@/state/themeSlice'
import { clearUser, setAuthReady, setUserAuth } from '@/state/userSlice'

type AuthBootstrapProps = {
  children: React.ReactNode
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const dispatch = useAppDispatch()
  const loginTrackedRef = useRef(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUserAuth({
            uid: user.uid,
            displayName: user.displayName,
          })
        )

        if (!loginTrackedRef.current) {
          loginTrackedRef.current = true

          void trackAnalyticsEvent('login', {
            provider: user.providerData[0]?.providerId ?? 'anonymous',
            uid: user.uid,
          })
        }
      } else {
        loginTrackedRef.current = false
        dispatch(clearUser())
        dispatch(clearThemeSelected())
      }

      // ✅ auth risolta UNA SOLA VOLTA
      dispatch(setAuthReady())
    })

    return unsubscribe
  }, [dispatch])

  return <>{children}</>
}
