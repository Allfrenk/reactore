type HookPageLayoutProps = {
  title: string
  description?: string
  action: React.ReactNode
  explanation: React.ReactNode
}

export function HookPageLayout({
  title,
  description,
  action,
  explanation,
}: HookPageLayoutProps) {
  return (
    <section className="hook-page-root">
      <header className="hook-page-header">
        <h1 className="hook-page-title">{title}</h1>
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
      `}</style>
    </section>
  )
}
