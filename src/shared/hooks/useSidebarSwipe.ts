import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { closeSidebar, openSidebar } from '@/state/layoutSlice'
import { useEffect, useRef } from 'react'

/**
 * EDGE ZONE per apertura (px)
 * → deve essere piccola e precisa
 */
const EDGE_OPEN_THRESHOLD_PX = 24

/**
 * Distanza minima swipe per evitare micro-movimenti
 */
const MIN_SWIPE_DISTANCE_PX = 60

/**
 * Percentuale larghezza sidebar per chiusura
 * → gesto intenzionale
 */
const CLOSE_SWIPE_RATIO = 0.45

export function useSidebarSwipe() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(state => state.layout.sidebarOpen)

  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      startX.current = touch.clientX
      startY.current = touch.clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (startX.current === null || startY.current === null) return

      const touch = e.touches[0]
      const dx = touch.clientX - startX.current
      const dy = Math.abs(touch.clientY - startY.current)

      // ❌ ignora scroll verticale
      if (dy > Math.abs(dx)) return

      /**
       * ======================
       * 👉 OPEN SIDEBAR
       * ======================
       */
      if (
        !sidebarOpen &&
        startX.current <= EDGE_OPEN_THRESHOLD_PX &&
        dx > MIN_SWIPE_DISTANCE_PX
      ) {
        dispatch(openSidebar())
        navigator.vibrate?.(10)
        reset()
        return
      }

      /**
       * ======================
       * 👈 CLOSE SIDEBAR
       * ======================
       */
      if (sidebarOpen && dx < 0) {
        // stima larghezza sidebar (mobile)
        const sidebarWidth = window.innerWidth * 0.55

        if (Math.abs(dx) > sidebarWidth * CLOSE_SWIPE_RATIO) {
          dispatch(closeSidebar())
          navigator.vibrate?.(10)
          reset()
        }
      }
    }

    const reset = () => {
      startX.current = null
      startY.current = null
    }

    const onTouchEnd = reset

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [dispatch, sidebarOpen])
}
