import { useEffect, useRef, useState } from 'react'

type FadeUpProps = {
  children: React.ReactNode
  delay?: number
  velocity?: 'slow' | 'normal' | 'fast'
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
  className?: string
}

const velocityMap = {
  slow: { duration: 900, distance: 16 },
  normal: { duration: 650, distance: 10 },
  fast: { duration: 450, distance: 6 },
}

function getTransform(direction: FadeUpProps['direction'], distance: number) {
  switch (direction) {
    case 'down':
      return `translateY(-${distance}px)`
    case 'left':
      return `translateX(${distance}px)`
    case 'right':
      return `translateX(-${distance}px)`
    case 'up':
    default:
      return `translateY(${distance}px)`
  }
}

export function FadeUp({
  children,
  delay = 0,
  velocity = 'normal',
  direction = 'up',
  once = true,
  className = '',
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const { duration, distance } = velocityMap[velocity]
  const hiddenTransform = getTransform(direction, distance)

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0, 0)' : hiddenTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)',
      }}
    >
      {children}
    </div>
  )
}
