import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleTheme } from '@/slices/themeSlice'
import { useState } from 'react'

export function ThemeToggleIcon() {
  const dispatch = useAppDispatch()
  const resolvedMode = useAppSelector(state => state.theme.resolvedMode)

  // angolo cumulativo → garantisce rotazione sempre oraria
  const [rotation, setRotation] = useState(() => (resolvedMode === 'dark' ? 180 : 0))

  const handleToggle = () => {
    setRotation(prev => prev + 180)
    dispatch(toggleTheme())
  }

  return (
    <i
      role="button"
      aria-label="Toggle theme"
      onClick={handleToggle}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="
        fa-solid fa-circle-half-stroke
        cursor-pointer
        text-5xl
        text-primary
        transition-transform
        duration-700
        ease-in-out
        hover:opacity-80
      "
    />
  )
}
