import { useCallback, useRef } from 'react'

const MAX_TILT = 3 // degrees
const SCALE_HOVER = 1.01
const PERSPECTIVE = '900px'

const T_SMOOTH = `transform 700ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 400ms cubic-bezier(0.23, 1, 0.32, 1)`
const T_TRACK = `transform 120ms linear, box-shadow 300ms ease`

export function useCardTilt<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  const isFirstMove = useRef(true)

  const onMouseEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.willChange = 'transform'
    isFirstMove.current = true
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateY = ((x / rect.width) - 0.5) * 2 * MAX_TILT
    const rotateX = -(((y / rect.height) - 0.5) * 2 * MAX_TILT)

    el.style.transition = isFirstMove.current ? T_SMOOTH : T_TRACK
    isFirstMove.current = false

    el.style.transform = `perspective(${PERSPECTIVE}) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${SCALE_HOVER})`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return

    el.style.transition = T_SMOOTH
    el.style.transform = `perspective(${PERSPECTIVE}) rotateX(0deg) rotateY(0deg) scale(1)`

    el.addEventListener(
      'transitionend',
      () => {
        el.style.willChange = 'auto'
      },
      { once: true }
    )
  }, [])

  return { ref, onMouseEnter, onMouseMove, onMouseLeave }
}
