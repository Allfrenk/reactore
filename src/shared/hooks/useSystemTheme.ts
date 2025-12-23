import { useAppDispatch } from '@/core/app/hooks'
import { setThemeDefault } from '@/state/themeSlice'
import { useEffect } from 'react'

export function useSystemTheme() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    const applySystemTheme = () => {
      dispatch(setThemeDefault(mq.matches ? 'dark' : 'light'))
    }

    applySystemTheme() // iniziale
    mq.addEventListener('change', applySystemTheme)

    return () => mq.removeEventListener('change', applySystemTheme)
  }, [dispatch])
}
