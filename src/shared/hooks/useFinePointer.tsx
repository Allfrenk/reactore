import { useEffect, useState } from 'react'

export function useFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(() => {
    return window.matchMedia('(pointer: fine)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')

    const handler = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return hasFinePointer
}
