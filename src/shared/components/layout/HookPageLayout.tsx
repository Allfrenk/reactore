export type HookBadge = 'essential' | 'performance' | 'advanced'

type HookPageLayoutProps = {
  title: string
  description?: string
  badge?: HookBadge
  action: React.ReactNode
  explanation: React.ReactNode
}

const BADGE_LABEL: Record<HookBadge, string> = {
  essential: 'Essential',
  performance: 'Performance',
  advanced: 'Advanced',
}

export function HookPageLayout({
  title,
  description,
  badge,
  action,
  explanation,
}: HookPageLayoutProps) {
  return (
    <section className="hook-page-root">
      <header className="hook-page-header">
        <div className="hook-page-title-row">
          <h1 className="hook-page-title">{title}</h1>
          {badge && (
            <span className={`hook-badge hook-badge--${badge}`}>
              {BADGE_LABEL[badge]}
            </span>
          )}
        </div>
        {description && <p className="hook-page-desc">{description}</p>}
      </header>

      <div className="hook-page-content">
        {action}
        {explanation}
      </div>

      <style>{`
        .hook-page-root {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 4rem;
        }

        @media (min-width: 768px) {
          .hook-page-root {
            padding-bottom: 6rem;
          }
        }

        .hook-page-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .hook-page-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* PAGE TITLE — LOWER THAN HOME HERO */
        .hook-page-title {
          font-size: clamp(2rem, 3.2vw, 2.6rem);
          font-weight: 600;
          line-height: 1.2;
        }

        .hook-page-desc {
          color: hsl(var(--muted-foreground));
          max-width: 46rem;
        }

        /* CONTENT */
        .hook-page-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .hook-page-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── BADGE PILLOLE ── */
        .hook-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.22rem 0.7rem;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--font-mono);
          white-space: nowrap;
          line-height: 1;
          border: 1px solid transparent;
          /* sit on baseline with the title */
          translate: 0 2px;
        }

        .hook-badge--essential {
          color: #16a34a;
          background: color-mix(in srgb, #16a34a 12%, transparent);
          border-color: color-mix(in srgb, #16a34a 28%, transparent);
        }

        .hook-badge--performance {
          color: #d97706;
          background: color-mix(in srgb, #d97706 12%, transparent);
          border-color: color-mix(in srgb, #d97706 28%, transparent);
        }

        .hook-badge--advanced {
          color: #7c3aed;
          background: color-mix(in srgb, #7c3aed 12%, transparent);
          border-color: color-mix(in srgb, #7c3aed 28%, transparent);
        }

        .dark .hook-badge--essential {
          color: #4ade80;
          background: color-mix(in srgb, #4ade80 14%, transparent);
          border-color: color-mix(in srgb, #4ade80 28%, transparent);
        }

        .dark .hook-badge--performance {
          color: #fbbf24;
          background: color-mix(in srgb, #fbbf24 14%, transparent);
          border-color: color-mix(in srgb, #fbbf24 28%, transparent);
        }

        .dark .hook-badge--advanced {
          color: #a78bfa;
          background: color-mix(in srgb, #a78bfa 14%, transparent);
          border-color: color-mix(in srgb, #a78bfa 28%, transparent);
        }
      `}</style>
    </section>
  )
}
