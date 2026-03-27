import { useAppSelector } from '@/core/app/hooks'
import { ReduxStoreCard } from '@/shared/components/cards/ReduxStoreCard'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { useNavigate } from 'react-router-dom'
import { localHooksConfig, reduxHooksConfig } from './reduxStore.config'

function ReduxStoreCardWrapper({ item }: { item: (typeof reduxHooksConfig)[number] }) {
  const value = useAppSelector(item.selector)
  const navigate = useNavigate()

  return (
    <ReduxStoreCard
      title={item.title}
      value={value}
      description={item.description}
      onClick={() => void navigate(item.to)}
    />
  )
}

function LocalStoreCardWrapper({ item }: { item: (typeof localHooksConfig)[number] }) {
  const navigate = useNavigate()

  return (
    <ReduxStoreCard
      title={item.title}
      value="—"
      description={item.description}
      onClick={() => void navigate(item.to)}
    />
  )
}

export function YourStorePage() {
  return (
    <PageFade>
      <main className="redux-root">
        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">Your Redux Store</h1>

          <p className="hero-desc">
            This page provides an overview of the state currently stored in your{' '}
            <span className="hero-accent font-semibold">Redux store</span>.
            <br />
            Each card represents a specific slice of state used by the application. Click
            on a card to explore how that state is created, updated, and consumed in its
            related hook or feature.
          </p>
        </section>

        {/* PERSISTED HOOKS */}
        <section className="redux-section">
          <div className="redux-section-header">
            <h2 className="redux-section-title">Persisted in store</h2>
            <p className="redux-section-desc">
              These hook demos write their state to Redux — values survive navigation and
              are synced to Firestore for authenticated users.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reduxHooksConfig.map(item => (
              <TiltCardWrapper key={item.key} tiltIntensity="strong">
                <ReduxStoreCardWrapper item={item} />
              </TiltCardWrapper>
            ))}
          </div>
        </section>

        {/* LOCAL HOOKS */}
        <section className="redux-section">
          <div className="redux-section-header">
            <h2 className="redux-section-title">Local state only</h2>
            <p className="redux-section-desc">
              These hook demos manage state entirely within the component — they are not
              wired to Redux. This is intentional: not every state belongs in a global
              store.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localHooksConfig.map(item => (
              <TiltCardWrapper key={item.key} tiltIntensity="strong">
                <LocalStoreCardWrapper item={item} />
              </TiltCardWrapper>
            ))}
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
        }

        @media (min-width: 768px) {
          .redux-section {
            margin-top: 4rem;
          }
        }

        .redux-section-header {
          margin-bottom: 1.2rem;
        }

        .redux-section-title {
          font-weight: 600;
          font-size: 1.4rem;
        }

        .redux-section-desc {
          margin-top: 0.3rem;
          max-width: 42rem;
          font-size: 0.9rem;
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </PageFade>
  )
}
