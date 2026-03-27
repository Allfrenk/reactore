// src/shared/components/cards/ReduxStoreCard.tsx

import { useCardTilt } from '@/shared/hooks/useCardTilt'

type ReduxStoreCardProps = {
  title: string
  value: string | number
  description: string
  onClick?: () => void
}

export function ReduxStoreCard({
  title,
  value,
  description,
  onClick,
}: ReduxStoreCardProps) {
  const tilt = useCardTilt<HTMLButtonElement>()
  const isHook = title.startsWith('use')
  const hookName = isHook ? title.slice(3) : title

  return (
    <button
      ref={tilt.ref}
      type="button"
      onClick={onClick}
      onMouseEnter={tilt.onMouseEnter}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="group /* Card proportions */ border-border/70 /* base padding */ /* 👉 mobile: più respiro a destra */ aspect-4/1 w-full cursor-pointer rounded-2xl border bg-(--bg-surface) p-4 pr-5 text-left shadow-[0_10px_30px_rgb(0_0_0/0.10)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(0_0_0/0.14),0_0_0_1px_rgb(var(--accent-primary)/0.20)] sm:aspect-3/1 lg:aspect-4/3"
    >
      {/*
        MOBILE / MID:
        | ORANGE (text) | YELLOW (value) |
        DESKTOP:
        ORANGE (40%)
        YELLOW (60%)
      */}
      <div className="/* DESKTOP: vertical split 40 / 60 */ grid h-full grid-cols-[1fr_auto] items-stretch gap-x-3 lg:grid-cols-1 lg:grid-rows-[40%_60%]">
        {/* 🟧 ORANGE AREA — title + description */}
        <div className="/* desktop: push content slightly up */ flex flex-col justify-center overflow-hidden lg:justify-start lg:pt-2">
          <h3 className="/* title slightly bigger on desktop */ text-sm font-semibold tracking-tight lg:text-base">
            {isHook ? (
              <>
                <span>use</span>
                <span className="text-(--accent-primary)">{hookName}</span>
              </>
            ) : (
              title
            )}
          </h3>

          <p className="/* only description scales */ mt-1 line-clamp-2 text-[clamp(0.75rem,1vw,0.9rem)] leading-snug text-(--text-secondary)">
            {description}
          </p>
        </div>

        {/* 🟨 YELLOW AREA — value */}
        <div className="/* mobile: move number slightly left */ /* desktop: move number slightly up */ flex h-full items-center justify-center pr-1 lg:items-start lg:pt-4">
          <span className="/* dominant number */ text-[clamp(3rem,6vw,4.5rem)] leading-none font-semibold tracking-tight text-(--text-primary)">
            {value}
          </span>
        </div>
      </div>
    </button>
  )
}
