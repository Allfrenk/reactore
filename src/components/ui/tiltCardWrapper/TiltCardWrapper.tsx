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

    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

    el.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `
  }

  const resetTransform = () => {
    const el = ref.current
    if (!el) return

    el.style.transform = `
      perspective(900px)
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
      className={`transition-transform duration-300 ease-out will-change-transform ${className} `}
    >
      {children}
    </div>
  )
}
