import { PageFade } from '@/shared/components/ui/PageFade'

export function WhatIsReduxPage() {
  return (
    <PageFade>
      <main className="redux-root">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">
            What is <span className="hero-accent">Redux</span>
          </h1>

          <p className="hero-desc">
            This page explains what Redux is and how it is used inside Reactore.
            <br />
            The goal is to build a clear mental model of how state flows through the
            application, from user interaction to data consumption.
          </p>
        </section>

        {/* CONTENT PLACEHOLDER */}
        <section className="redux-section opacity-40">
          {/* Diagram placeholder */}
          <div className="h-40 rounded-xl border border-dashed border-(--border-soft)" />

          {/* Cards / concepts placeholder */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="h-32 rounded-xl border border-dashed border-(--border-soft)" />
            <div className="h-32 rounded-xl border border-dashed border-(--border-soft)" />
            <div className="h-32 rounded-xl border border-dashed border-(--border-soft)" />
          </div>
        </section>
      </main>

      {/* LOCAL STYLES */}
      <style>{`
        .redux-root {
          display: flex;
          flex-direction: column;
          padding-bottom: 4rem;
        }

        @media (min-width: 768px) {
          .redux-root {
            padding-bottom: 6rem;
          }
        }

        /* HERO */
        .hero {
          display: flex;
          flex-direction: column;
        }

        .hero-title {
          max-width: 56rem;
          font-weight: 600;
          line-height: 1.1;
          font-size: clamp(3rem, 5vw, 4rem);
        }

        .hero-desc {
          max-width: 42rem;
          margin-top: 1.2rem;
          font-size: 1.05rem;
          color: hsl(var(--muted-foreground));
        }

        .hero-accent {
          color: var(--accent-primary);
        }

        /* SECTION */
        .redux-section {
          margin-top: 3.2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .redux-section {
            margin-top: 4rem;
          }
        }
      `}</style>
    </PageFade>
  )
}
