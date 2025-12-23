import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { setThemeDefault } from '@/state/themeSlice'
import { useEffect } from 'react'

type ThemeBootstrapProps = {
  children: React.ReactNode
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeBootstrap({ children }: ThemeBootstrapProps) {
  const dispatch = useAppDispatch()
  const themeSelected = useAppSelector(state => state.theme.themeSelected)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const systemTheme = getSystemTheme()

      dispatch(setThemeDefault(systemTheme))

      // Applichiamo il tema:
      // - se l’utente NON ha scelto manualmente → usa system
      // - se ha scelto → lo ignora (ci pensa il toggle)
      const themeToApply = themeSelected ?? systemTheme
      document.documentElement.classList.toggle('dark', themeToApply === 'dark')
    }

    applyTheme()

    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [dispatch, themeSelected])

  return <>{children}</>
}
