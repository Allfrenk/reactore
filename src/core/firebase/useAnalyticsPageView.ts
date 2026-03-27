import { trackAnalyticsEvent } from '@/core/firebase/analytics'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function getPageName(pathname: string): string | null {
  if (pathname.startsWith('/hooks/useState')) return 'useState'
  if (pathname.startsWith('/hooks/useEffect')) return 'useEffect'
  if (pathname.startsWith('/hooks/useMemo')) return 'useMemo'
  if (pathname.startsWith('/hooks/useCallback')) return 'useCallback'
  return null
}

function getTimeBucket(ms: number): '<20s' | '20-60s' | '>60s' {
  if (ms < 20_000) return '<20s'
  if (ms < 60_000) return '20-60s'
  return '>60s'
}

export function useAnalyticsPageView() {
  const location = useLocation()

  const lastPageRef = useRef<string | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    const pageName = getPageName(location.pathname)

    // 🔁 USCITA DALLA PAGINA PRECEDENTE → page_time
    if (lastPageRef.current && startTimeRef.current) {
      const duration = now - startTimeRef.current
      const bucket = getTimeBucket(duration)

      void trackAnalyticsEvent('page_time', {
        page_name: lastPageRef.current,
        time_bucket: bucket,
      })
    }

    // 🚪 HOME o pagina non tracciata
    if (!pageName) {
      lastPageRef.current = null
      startTimeRef.current = null
      return
    }

    // 🆕 INGRESSO NUOVA PAGINA → page_view
    if (lastPageRef.current !== pageName) {
      lastPageRef.current = pageName
      startTimeRef.current = now

      void trackAnalyticsEvent('page_view', {
        page_name: pageName,
      })
    }
  }, [location.pathname])

  // 🔒 Traccia page_time anche se l'utente chiude il tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (lastPageRef.current && startTimeRef.current) {
        const duration = Date.now() - startTimeRef.current
        const bucket = getTimeBucket(duration)
        void trackAnalyticsEvent('page_time', {
          page_name: lastPageRef.current,
          time_bucket: bucket,
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
}
