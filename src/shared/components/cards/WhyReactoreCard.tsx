import { useCardTilt } from '@/shared/hooks/useCardTilt'

type WhyReactoreCardProps = {
  className?: string
}

export function WhyReactoreCard({ className = '' }: WhyReactoreCardProps) {
  const tilt = useCardTilt<HTMLElement>()

  return (
    <section
      ref={tilt.ref}
      onMouseEnter={tilt.onMouseEnter}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`glass-card rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(0_0_0/0.14),0_0_0_1px_rgb(var(--accent-primary)/0.22)] ${className}`}
    >
      <header className="mb-5 flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-(--text-primary)">
          Why <span className="text-(--accent-primary)">Reactore</span>?
        </h2>
        <p className="text-muted-foreground text-sm">
          From raw concepts to refined understanding
        </p>
      </header>

      <div className="space-y-3 text-sm leading-relaxed text-(--text-secondary)">
        <p>
          <strong>Reactore</strong> comes from the fusion of{' '}
          <span className="font-mono">React</span> and{' '}
          <span className="font-mono">Ore</span>: raw material.
        </p>

        <p>
          Just like ore, raw knowledge has little value until it is processed, refined and
          shaped into something usable.
        </p>

        <p>
          Reactore is built as a <strong>didactic project</strong> and a{' '}
          <strong>portfolio-grade application</strong>, focused on transforming concepts
          into clear mental models through real implementations.
        </p>

        <p>
          What starts as learning material is intentionally designed to evolve into a{' '}
          <strong>real product</strong>, feature by feature.
        </p>
      </div>
    </section>
  )
}
