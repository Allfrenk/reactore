import { useFinePointer } from '@/shared/hooks/useFinePointer'
import { useRef } from 'react'

type TiltIntensity = 'soft' | 'medium' | 'strong'

type TiltCardWrapperProps = {
  children: React.ReactNode
  className?: string
  /**
   * Tilt intensity preset:
   * - soft   → subtle tilt (1.8)
   * - medium → visible tilt (4.5)
   * - strong → pronounced tilt (7)
   */
  tiltIntensity?: TiltIntensity
}

const TILT_INTENSITY_MAP: Record<TiltIntensity, number> = {
  soft: 1.8,
  medium: 4.5,
  strong: 7,
}

export function TiltCardWrapper({
  children,
  className = '',
  tiltIntensity = 'soft',
}: TiltCardWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasFinePointer = useFinePointer()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    // nessuna transition durante il movimento
    el.style.transition = 'none'

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const intensity = TILT_INTENSITY_MAP[tiltIntensity]

    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity

    el.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `
  }

  const resetTransform = () => {
    const el = ref.current
    if (!el) return

    // transition SOLO nel reset
    el.style.transition = 'transform 180ms ease-out'
    el.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
    `
  }

  return (
    <div
      ref={ref}
      onMouseMove={hasFinePointer ? handleMouseMove : undefined}
      onMouseLeave={hasFinePointer ? resetTransform : undefined}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
