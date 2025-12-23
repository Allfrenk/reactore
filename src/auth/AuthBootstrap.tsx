import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { auth } from '@/lib/firebase/firebase'
import { clearThemeSelected } from '@/slices/themeSlice'
import { clearUser, setUserAuth } from '@/slices/userSlice'

type AuthBootstrapProps = {
  children: React.ReactNode
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUserAuth({
            uid: user.uid,
            displayName: user.displayName,
          })
        )
      } else {
        // 🔁 logout / session expired
        dispatch(clearUser())
        dispatch(clearThemeSelected())
      }
    })

    return unsubscribe
  }, [dispatch])

  return <>{children}</>
}
