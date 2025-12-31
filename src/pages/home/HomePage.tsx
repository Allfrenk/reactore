import { WhyReactoreCard } from '@/shared/components/cards/WhyReactoreCard'
import { RoadmapSection } from '@/shared/components/general/RoadmapSection'
import { FadeUp } from '@/shared/components/ui/FadeUp'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'

export function HomePage() {
  return (
    <PageFade>
      <main className="home-root">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">
            A didactic <span className="hero-accent">React</span> project built for{' '}
            <span className="hero-accent">portfolio</span> and real understanding
            <span className="beta-inline">BETA</span>
          </h1>

          <p className="hero-desc">
            Reactore is an evolving React application designed to explain hooks and
            patterns through clear mental models and practical examples.
          </p>

          <p className="hero-cta">
            Start from{' '}
            <a href="/hooks/useState" className="hero-cta-link">
              useState
            </a>{' '}
            →
          </p>
        </section>

        {/* ROADMAP */}
        <section className="roadmap-wrapper">
          <FadeUp velocity="normal" direction="up">
            <RoadmapSection />
          </FadeUp>
        </section>

        {/* WHY REACTORE */}
        <section className="why-reactore-wrapper">
          <FadeUp velocity="slow" direction="up" delay={200}>
            <TiltCardWrapper>
              <WhyReactoreCard />
            </TiltCardWrapper>
          </FadeUp>
        </section>
      </main>

      {/* LOCAL STYLES */}
      <style>{`
        .home-root {
          display: flex;
          flex-direction: column;
          padding-bottom: 4rem;
        }

        @media (min-width: 768px) {
          .home-root {
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

        .hero-cta {
          margin-top: 1.4rem;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: hsl(var(--muted-foreground));
        }

        .hero-cta-link {
          text-decoration: underline;
          cursor: pointer;
          color: inherit;
        }

        .hero-cta-link:hover {
          color: var(--accent-primary);
        }

        /* ROADMAP */
        .roadmap-wrapper {
          margin-top: 3.2rem;
        }

        @media (min-width: 768px) {
          .roadmap-wrapper {
            margin-top: 4rem;
          }
        }

        /* WHY REACTORE */
        .why-reactore-wrapper {
          margin-top: 3.2rem;
          max-width: 42rem;
          margin-inline: auto;
        }

        @media (min-width: 768px) {
          .why-reactore-wrapper {
            margin-top: 2.8rem;
          }
        }

        /* ACCENT */
        .hero-accent {
          color: var(--accent-primary);
        }

        /* BETA BADGE */
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
