import { useFinePointer } from '@/hooks/useFinePointer'
import { useRef } from 'react'

type TiltCardWrapperProps = {
  children: React.ReactNode
  className?: string
}

export function TiltCardWrapper({ children, className = '' }: TiltCardWrapperProps) {
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

    // 🔽 TILT MOLTO RIDOTTO (anti-blur)
    const rotateX = ((y - centerY) / centerY) * -0.8
    const rotateY = ((x - centerX) / centerX) * 0.8

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
