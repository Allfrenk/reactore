import { useAppDispatch, useAppSelector } from '@/core/app/hooks'
import { setThemeSelected } from '@/state/themeSlice'
import { useState } from 'react'

type FlipState = 'idle' | 'edge'

export function ThemeToggleIcon() {
  const dispatch = useAppDispatch()
  const { themeDefault, themeSelected } = useAppSelector(state => state.theme)

  const [flip, setFlip] = useState<FlipState>('idle')

  const currentTheme = themeSelected ?? themeDefault
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

  const handleToggle = () => {
    // fase 1 → la moneta va "di taglio"
    setFlip('edge')

    // cambia tema mentre è di taglio (illusione perfetta)
    setTimeout(() => {
      dispatch(setThemeSelected(nextTheme))
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
      className="flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-80"
    >
      <i
        className={`fa-solid fa-circle-half-stroke transform-gpu cursor-pointer text-xl leading-none text-(--text-primary) transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${
          flip === 'edge' ? 'scale-x-[0.15] scale-y-110' : 'scale-x-100 scale-y-100'
        } `}
      />
    </button>
  )
}
