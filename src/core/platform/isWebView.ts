export function isWebView(): boolean {
  if (typeof window === 'undefined') return false

  const ua = navigator.userAgent || navigator.vendor || ''

  // iOS WebView (LinkedIn, WhatsApp, Instagram)
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return !/Safari/i.test(ua)
  }

  // Android WebView
  if (/Android/i.test(ua)) {
    return /wv|Version\/\d+\.\d+/i.test(ua)
  }

  // Generic embedded browsers
  return /(FBAN|FBAV|Instagram|LinkedInApp|WhatsApp)/i.test(ua)
}
