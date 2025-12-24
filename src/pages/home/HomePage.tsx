import { RoadmapSection } from '@/shared/components/general/RoadmapSection'
import { PageFade } from '@/shared/components/ui/PageFade'

export function HomePage() {
  return (
    <PageFade>
      <main className="home-root">
        <section className="hero">
          {/* CLAIM + BETA INLINE */}
          <h1 className="hero-title">
            A didactic <span className="hero-accent">React</span> project built for{' '}
            <span className="hero-accent">portfolio</span> and real understanding
            <span className="beta-inline">BETA</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="hero-desc">
            Reactore is an evolving React application designed to explain hooks and
            patterns through clear mental models and practical examples.
          </p>

          {/* CTA */}
          <p className="hero-cta">
            Start from <span>useState</span> →
          </p>
        </section>

        {/* ROADMAP */}
        <div className="roadmap-wrapper">
          <RoadmapSection />
        </div>
      </main>

      {/* LOCAL CSS TOKENS */}
      <style>{`
        .home-root {
          display: flex;
          flex-direction: column;
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
          font-size: clamp(2.6rem, 4.8vw, 3.7rem);
        }

        .hero-desc {
          max-width: 42rem;
          margin-top: 1.2rem;
          font-size: 1.05rem;
          color: hsl(var(--muted-foreground));
        }

        /* CTA */
        .hero-cta {
          margin-top: 1.6rem;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: hsl(var(--muted-foreground));
        }

        .hero-cta span {
          text-decoration: underline;
          cursor: pointer;
        }

        /* ROADMAP SPACING */
        .roadmap-wrapper {
          margin-top: 5rem;
        }

        @media (min-width: 768px) {
          .roadmap-wrapper {
            margin-top: 7rem;
          }
        }

        /* ACCENT */
        .hero-accent {
          color: var(--accent-primary);
        }

        /* =========================
           INLINE BETA — GLASS REFINED
           ========================= */

        .beta-inline {
          display: inline-flex;
          align-items: center;
          margin-left: 0.6rem;
          padding: 0.28rem 0.65rem;

          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          font-weight: 500;

          color: var(--accent-primary);

          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent-primary) 18%, transparent),
            rgba(255, 255, 255, 0.35)
          );

          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);

          border: 1px solid
            color-mix(in srgb, var(--accent-primary) 28%, rgba(255, 255, 255, 0.4));

          border-radius: 0.6rem;

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(255, 255, 255, 0.15);

          vertical-align: middle;
        }
      `}</style>
    </PageFade>
  )
}
