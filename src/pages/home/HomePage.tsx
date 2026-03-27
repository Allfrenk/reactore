import { WhyReactoreCard } from '@/shared/components/cards/WhyReactoreCard'
import { RoadmapSection } from '@/shared/components/general/RoadmapSection'
import { FadeUp } from '@/shared/components/ui/FadeUp'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { useAuth } from '@/shared/hooks/useAuth'
import { Link } from 'react-router-dom'

export function HomePage() {
  const { user } = useAuth()
  const isRecruiter = user?.role === 'recruiter'

  return (
    <PageFade>
      <main className="home-root">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">
            A didactic <span className="hero-accent">React</span> project built for{' '}
            <span className="hero-accent">portfolio</span> and real understanding
            <span className="app-badge app-badge--beta ml-2">BETA</span>
          </h1>

          <p className="hero-desc">
            Reactore is an evolving React application designed to explain hooks and
            patterns through clear mental models and practical examples.
          </p>

          <p className="hero-cta">
            Start from{' '}
            <Link to="/hooks/useState" className="hero-cta-link">
              useState
            </Link>{' '}
            →
          </p>

          {/* RECRUITER DISCLAIMER (solo recruiter) */}
          {isRecruiter && (
            <div className="recruiter-disclaimer glass-card">
              <strong>Recruiter mode</strong>
              <p>
                You are exploring a limited demo environment.
                <br />
                To see persistence and full analytics, use a standard login.
              </p>
            </div>
          )}
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

        /* RECRUITER DISCLAIMER */
        .recruiter-disclaimer {
          margin-top: 1.3rem;
          max-width: 42rem;
          padding: 1rem 1.2rem;
          border-radius: 1rem;
          font-size: 0.92rem;
          line-height: 1.45;
          color: hsl(var(--muted-foreground));
        }

        .recruiter-disclaimer strong {
          display: block;
          margin-bottom: 0.2rem;
          color: hsl(var(--foreground));
          font-weight: 600;
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
      `}</style>
    </PageFade>
  )
}
