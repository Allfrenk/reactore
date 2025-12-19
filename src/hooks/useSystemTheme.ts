// useSystemTheme.ts
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { syncSystemTheme } from '@/slices/themeSlice'
import { useEffect } from 'react'

export function useSystemTheme() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector(s => s.theme.mode)

  useEffect(() => {
    if (mode !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => dispatch(syncSystemTheme())

    handler() // iniziale
    mq.addEventListener('change', handler)

    return () => mq.removeEventListener('change', handler)
  }, [mode, dispatch])
}
