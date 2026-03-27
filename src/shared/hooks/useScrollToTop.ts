import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const main = document.querySelector('.app-content')
    if (main) {
      main.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname])
}
