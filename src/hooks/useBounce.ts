// src/hooks/useBounce.ts
import { useRef } from 'react'

/**
 * Hook custom che applica un effetto "bounce" alla card.
 * Restituisce:
 *  - cardRef → da assegnare al container da animare
 *  - triggerBounce → funzione da chiamare quando vuoi animare
 */
export default function useBounce(duration: number = 300) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  function triggerBounce() {
    const el = cardRef.current
    if (!el) return

    // Applica stile transizione
    el.style.transition = `transform ${duration}ms cubic-bezier(.34,1.56,.64,1)`

    // Step 1 → gonfia
    el.style.transform = 'scale(1.08)'

    // Step 2 → torna normale
    setTimeout(() => {
      if (el) {
        el.style.transform = 'scale(1)'
      }
    }, duration)
  }

  return { cardRef, triggerBounce }
}
