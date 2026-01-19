import { useEffect } from 'react'
import { isWebView } from './isWebView'

export function useForceBrowser() {
  useEffect(() => {
    if (!isWebView()) return

    const url = window.location.href

    // iOS → Safari
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = url
      return
    }

    // Android → Chrome / default browser
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = url
      return
    }
  }, [])
}
