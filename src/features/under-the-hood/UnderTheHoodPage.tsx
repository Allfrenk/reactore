import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { BuildStatsSection } from './BuildStatsSection'
import type { ArchItem, TechCategory, TechItem } from './underTheHood.config'
import { architectureDecisions, techStack } from './underTheHood.config'

// ── Category badge style ───────────────────────────────────────────────────

const CATEGORY_LABEL: Record<TechCategory, string> = {
  runtime: 'Runtime',
  build: 'Build',
  infra: 'Infra',
  testing: 'Testing',
}

const CATEGORY_COLORS: Record<TechCategory, { text: string; bg: string; border: string }> = {
  runtime: {
    text: '#2563eb',
    bg: 'color-mix(in srgb, #2563eb 14%, transparent)',
    border: 'color-mix(in srgb, #2563eb 28%, transparent)',
  },
  build: {
    text: '#d97706',
    bg: 'color-mix(in srgb, #d97706 14%, transparent)',
    border: 'color-mix(in srgb, #d97706 28%, transparent)',
  },
  infra: {
    text: '#ea580c',
    bg: 'color-mix(in srgb, #ea580c 14%, transparent)',
    border: 'color-mix(in srgb, #ea580c 28%, transparent)',
  },
  testing: {
    text: '#16a34a',
    bg: 'color-mix(in srgb, #16a34a 14%, transparent)',
    border: 'color-mix(in srgb, #16a34a 28%, transparent)',
  },
}

// ── Sub-components ─────────────────────────────────────────────────────────

function TechCard({ item }: { item: TechItem }) {
  const cat = CATEGORY_COLORS[item.category]
  return (
    <div className="glass-card uth-tech-card">
      <div className="uth-tech-card-top">
        <div
          className="uth-tech-icon-wrap"
          style={{ background: `${item.color}1a`, color: item.color }}
        >
          <item.icon size={20} strokeWidth={1.75} />
        </div>
        <div className="uth-tech-meta">
          <span className="uth-tech-name">{item.name}</span>
          <span className="uth-tech-version">v{item.version}</span>
        </div>
        <span
          className="uth-cat-badge"
          style={{ color: cat.text, background: cat.bg, border: `1px solid ${cat.border}` }}
        >
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>
      <p className="uth-tech-desc">{item.description}</p>
    </div>
  )
}

function ArchCard({ item }: { item: ArchItem }) {
  return (
    <div className="glass-card uth-arch-card">
      <div
        className="uth-arch-icon-wrap"
        style={{
          background: 'color-mix(in srgb, var(--accent-primary) 12%, transparent)',
          color: 'var(--accent-primary)',
        }}
      >
        <item.icon size={20} strokeWidth={1.75} />
      </div>
      <div>
        <div className="uth-arch-title">{item.title}</div>
        <p className="uth-arch-desc">{item.description}</p>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export function UnderTheHoodPage() {
  return (
    <PageFade>
      <section className="uth-root">
        {/* HEADER */}
        <header className="uth-header">
          <div className="uth-title-row">
            <h1 className="uth-title">Under the Hood</h1>
          </div>
          <p className="uth-subtitle">
            Tools, architecture decisions, and live build stats behind this app — for the curious.
          </p>
        </header>

        {/* TECH STACK */}
        <section className="uth-section">
          <header className="uth-section-header">
            <h2 className="uth-section-title">Tech Stack</h2>
            <p className="uth-section-subtitle">
              Nine carefully chosen tools — each with a clear reason to be here.
            </p>
          </header>
          <div className="uth-tech-grid">
            {techStack.map(item => (
              <TiltCardWrapper key={item.name} tiltIntensity="soft">
                <TechCard item={item} />
              </TiltCardWrapper>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE DECISIONS */}
        <section className="uth-section">
          <header className="uth-section-header">
            <h2 className="uth-section-title">Architecture Decisions</h2>
            <p className="uth-section-subtitle">
              The structural choices that keep the codebase maintainable and fast.
            </p>
          </header>
          <div className="uth-arch-grid">
            {architectureDecisions.map(item => (
              <TiltCardWrapper key={item.title} tiltIntensity="soft">
                <ArchCard item={item} />
              </TiltCardWrapper>
            ))}
          </div>
        </section>

        {/* BUILD STATS */}
        <BuildStatsSection />

        <style>{`
          /* ── Root ── */
          .uth-root {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-bottom: 4rem;
          }

          @media (min-width: 768px) {
            .uth-root {
              padding-bottom: 6rem;
            }
          }

          /* ── Header — mirrors HookPageLayout exactly ── */
          .uth-header {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .uth-title-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
          }
          .uth-title {
            font-size: clamp(2rem, 3.2vw, 2.6rem);
            font-weight: 600;
            line-height: 1.2;
          }
          .uth-subtitle {
            color: hsl(var(--muted-foreground));
            max-width: 46rem;
          }

          /* ── Section ── */
          .uth-section {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .uth-section-header {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }
          .uth-section-title {
            font-size: 1.15rem;
            font-weight: 600;
          }
          .uth-section-subtitle {
            font-size: 0.875rem;
            color: hsl(var(--muted-foreground));
          }

          /* ── Tech grid ── */
          .uth-tech-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.875rem;
          }
          @media (min-width: 560px) {
            .uth-tech-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .uth-tech-grid { grid-template-columns: repeat(3, 1fr); }
          }

          /* ── Tech card ── */
          .uth-tech-card {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1.125rem;
            height: 100%;
          }
          .uth-tech-card-top {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .uth-tech-icon-wrap {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.75rem;
          }
          .uth-tech-meta {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
          }
          .uth-tech-name {
            font-size: 0.875rem;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .uth-tech-version {
            font-size: 0.68rem;
            font-family: var(--font-mono);
            color: hsl(var(--muted-foreground));
          }
          .uth-cat-badge {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            padding: 0.18rem 0.55rem;
            border-radius: 999px;
            font-size: 0.6rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            font-family: var(--font-mono);
            white-space: nowrap;
          }
          .uth-tech-desc {
            font-size: 0.8rem;
            line-height: 1.55;
            color: hsl(var(--muted-foreground));
          }

          /* ── Arch grid ── */
          .uth-arch-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.875rem;
          }
          @media (min-width: 560px) {
            .uth-arch-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .uth-arch-grid { grid-template-columns: repeat(3, 1fr); }
          }

          /* ── Arch card ── */
          .uth-arch-card {
            display: flex;
            align-items: flex-start;
            gap: 0.875rem;
            padding: 1.125rem;
          }
          .uth-arch-icon-wrap {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 0.625rem;
            margin-top: 0.05rem;
          }
          .uth-arch-title {
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
          }
          .uth-arch-desc {
            font-size: 0.8rem;
            line-height: 1.55;
            color: hsl(var(--muted-foreground));
          }

          /* ── Stats grid ── */
          .uth-stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.875rem;
          }
          @media (min-width: 768px) {
            .uth-stats-grid { grid-template-columns: repeat(4, 1fr); }
          }

          /* ── Stat card ── */
          .uth-stat-card {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            padding: 1.125rem;
          }
          .uth-stat-icon { margin-bottom: 0.25rem; }
          .uth-stat-label {
            font-size: 0.65rem;
            font-family: var(--font-mono);
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: hsl(var(--muted-foreground));
          }
          .uth-stat-value {
            font-size: 1.4rem;
            font-weight: 700;
            font-family: var(--font-mono);
            line-height: 1.15;
          }
          .uth-stat-sub {
            font-size: 0.68rem;
            font-family: var(--font-mono);
            color: hsl(var(--muted-foreground));
          }

          /* ── Inline code ── */
          .uth-code {
            font-family: var(--font-mono);
            font-size: 0.82em;
            background: color-mix(in srgb, currentColor 10%, transparent);
            padding: 0.1em 0.35em;
            border-radius: 4px;
          }
        `}</style>
      </section>
    </PageFade>
  )
}
