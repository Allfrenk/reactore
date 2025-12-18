import { useAppDispatch } from '@/app/hooks'
import { toggleTheme } from '@/slices/themeSlice'
import { useState } from 'react'

type FlipState = 'idle' | 'edge'

export function ThemeToggleIcon() {
  const dispatch = useAppDispatch()
  const [flip, setFlip] = useState<FlipState>('idle')

  const handleToggle = () => {
    // fase 1 → la moneta va "di taglio"
    setFlip('edge')

    // cambia tema mentre è di taglio (illusione perfetta)
    setTimeout(() => {
      dispatch(toggleTheme())
    }, 120)

    // fase 2 → torna frontale
    setTimeout(() => {
      setFlip('idle')
    }, 260)
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={handleToggle}
      className="
        flex h-10 w-10 items-center justify-center
        hover:opacity-80
        transition-opacity duration-200
      "
    >
      <i
        className={`
          fa-solid fa-circle-half-stroke
          text-3xl
          leading-none
          text-(--text-primary)
          transform-gpu
          transition-transform
          duration-300
          ease-[cubic-bezier(.34,1.56,.64,1)]
          ${flip === 'edge' ? 'scale-x-[0.15] scale-y-110' : 'scale-x-100 scale-y-100'}
        `}
      />
    </button>
  )
}
