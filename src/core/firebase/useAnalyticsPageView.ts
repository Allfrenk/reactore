import { trackAnalyticsEvent } from '@/core/firebase/analytics'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function getPageName(pathname: string): string | null {
  if (pathname.startsWith('/hooks/useState')) return 'useState'
  if (pathname.startsWith('/hooks/useEffect')) return 'useEffect'
  if (pathname.startsWith('/hooks/useMemo')) return 'useMemo'
  if (pathname.startsWith('/hooks/useCallback')) return 'useCallback'
  return null // home o pagine non tracciate
}

export function useAnalyticsPageView() {
  const location = useLocation()
  const lastPageRef = useRef<string | null>(null)

  useEffect(() => {
    const pageName = getPageName(location.pathname)
    console.log('[ANALYTICS]', location.pathname, pageName)

    if (!pageName) return

    void trackAnalyticsEvent('page_view', {
      page_name: pageName,
    })
  }, [location.pathname])
}
