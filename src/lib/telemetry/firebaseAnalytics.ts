import { getFirebaseAnalytics } from '@/lib/firebase/firebase'
import type { Analytics } from 'firebase/analytics'
import { logEvent } from 'firebase/analytics'

let analyticsInstance: Analytics | null = null

async function getAnalyticsInstance() {
  if (analyticsInstance) return analyticsInstance
  analyticsInstance = await getFirebaseAnalytics()
  return analyticsInstance
}

export async function trackAnalyticsEvent(
  name: string,
  params?: Record<string, unknown>
) {
  const analytics = await getAnalyticsInstance()
  if (!analytics) return
  logEvent(analytics, name, params)
}
