import { trackAnalyticsEvent } from '@/core/firebase/analytics'

type PageName =
  | 'useState'
  | 'useEffect'
  | 'useMemo'
  | 'useCallback'
  | 'useRef'
  | 'useReducer'
  | 'useContext'

export function trackPageInteraction(pageName: PageName, action: string) {
  void trackAnalyticsEvent('page_interaction', {
    page_name: pageName,
    action,
  })
}
