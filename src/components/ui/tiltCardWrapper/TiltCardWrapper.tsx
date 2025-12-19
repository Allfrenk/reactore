import { useRef } from 'react'

type TiltCardWrapperProps = {
  children: React.ReactNode
  className?: string
}

export function TiltCardWrapper({ children, className = '' }: TiltCardWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // 🔽 TILT RIDOTTO (prima era *4)
    const rotateX = ((y - centerY) / centerY) * -1.5
    const rotateY = ((x - centerX) / centerX) * 1.5

    el.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-2px)
    `
  }

  const resetTransform = () => {
    const el = ref.current
    if (!el) return

    el.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
