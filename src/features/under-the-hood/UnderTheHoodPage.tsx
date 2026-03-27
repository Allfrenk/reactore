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

// Pastel palette complementary to the orange accent (#ff5c39)
const CATEGORY_COLORS: Record<TechCategory, { text: string; bg: string; border: string }> = {
  runtime: {
    text: '#818CF8',
    bg: 'color-mix(in srgb, #818CF8 14%, transparent)',
    border: 'color-mix(in srgb, #818CF8 28%, transparent)',
  },
  build: {
    text: '#34D399',
    bg: 'color-mix(in srgb, #34D399 14%, transparent)',
    border: 'color-mix(in srgb, #34D399 28%, transparent)',
  },
  infra: {
    text: '#A78BFA',
    bg: 'color-mix(in srgb, #A78BFA 14%, transparent)',
    border: 'color-mix(in srgb, #A78BFA 28%, transparent)',
  },
  testing: {
    text: '#22D3EE',
    bg: 'color-mix(in srgb, #22D3EE 14%, transparent)',
    border: 'color-mix(in srgb, #22D3EE 28%, transparent)',
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
          background: `${item.color}1a`,
          color: item.color,
        }}
      >
        <item.icon size={20} strokeWidth={1.75} />
      </div>
      <div className="uth-arch-body">
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
        {/* HEADER — matches YourStorePage hero layout */}
        <header className="uth-hero">
          <h1 className="uth-hero-title">Under the Hood</h1>
          <p className="uth-hero-desc">
            Tools, architecture decisions, and live build stats behind this app — for the curious.
          </p>
        </header>

        {/* TECH STACK */}
        <section className="uth-section">
          <div className="uth-section-header">
            <h2 className="uth-section-title">Tech Stack</h2>
            <p className="uth-section-subtitle">
              Nine carefully chosen tools — each with a clear reason to be here.
            </p>
          </div>
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
          <div className="uth-section-header">
            <h2 className="uth-section-title">Architecture Decisions</h2>
            <p className="uth-section-subtitle">
              The structural choices that keep the codebase maintainable and fast.
            </p>
          </div>
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
            padding-bottom: 4rem;
            min-width: 0;
            width: 100%;
          }

          @media (min-width: 768px) {
            .uth-root {
              padding-bottom: 6rem;
            }
          }

          /* ── Hero — mirrors YourStorePage hero layout ── */
          .uth-hero {
            display: flex;
            flex-direction: column;
          }

          .uth-hero-title {
            max-width: 56rem;
            font-weight: 600;
            line-height: 1.1;
            font-size: clamp(3rem, 5vw, 4rem);
            overflow-wrap: break-word;
          }

          .uth-hero-desc {
            max-width: 46rem;
            margin-top: 1.2rem;
            font-size: 1.05rem;
            color: hsl(var(--muted-foreground));
            overflow-wrap: break-word;
          }

          /* ── Section ── */
          .uth-section {
            margin-top: 3.2rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            min-width: 0;
          }

          @media (min-width: 768px) {
            .uth-section {
              margin-top: 4rem;
            }
          }

          .uth-section-header {
            display: flex;
            flex-direction: column;
          }

          .uth-section-title {
            font-size: 1.4rem;
            font-weight: 600;
          }

          .uth-section-subtitle {
            margin-top: 0.3rem;
            font-size: 0.9rem;
            color: hsl(var(--muted-foreground));
            max-width: 42rem;
            overflow-wrap: break-word;
          }

          /* ── Grid items: allow shrinking below content min-size ── */
          .uth-tech-grid > *,
          .uth-arch-grid > *,
          .uth-stats-grid > * {
            min-width: 0;
          }

          /* ── Tech grid ── */
          .uth-tech-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.875rem;
          }

          @media (min-width: 560px) {
            .uth-tech-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }

          @media (min-width: 1024px) {
            .uth-tech-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }

          /* ── Tech card — fixed height so all cards are uniform ── */
          .uth-tech-card {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1.125rem;
            height: 100%;
            min-width: 0;
            /* min-height calibrated per breakpoint: enough for longest
               description at narrowest card width (3-col desktop) */
            min-height: 8rem;
          }

          @media (min-width: 560px) {
            .uth-tech-card { min-height: 9.5rem; }
          }

          @media (min-width: 1024px) {
            .uth-tech-card { min-height: 11rem; }
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

          /* Category badge — aligned to hook-badge sizing for consistency */
          .uth-cat-badge {
            flex-shrink: 0;
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
          }

          .uth-tech-desc {
            font-size: 0.8rem;
            line-height: 1.55;
            color: hsl(var(--muted-foreground));
            overflow-wrap: break-word;
            /* flex-grow pushes description to fill remaining card height */
            flex: 1;
          }

          /* ── Arch grid ── */
          .uth-arch-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.875rem;
          }

          @media (min-width: 560px) {
            .uth-arch-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }

          @media (min-width: 1024px) {
            .uth-arch-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }

          /* ── Arch card — uniform height per breakpoint ── */
          .uth-arch-card {
            display: flex;
            align-items: flex-start;
            gap: 0.875rem;
            padding: 1.125rem;
            height: 100%;
            min-width: 0;
            min-height: 7rem;
          }

          @media (min-width: 560px) {
            .uth-arch-card { min-height: 8rem; }
          }

          @media (min-width: 1024px) {
            .uth-arch-card { min-height: 9rem; }
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

          .uth-arch-body {
            flex: 1;
            min-width: 0;
          }

          .uth-arch-title {
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
            overflow-wrap: break-word;
          }

          .uth-arch-desc {
            font-size: 0.8rem;
            line-height: 1.55;
            color: hsl(var(--muted-foreground));
            overflow-wrap: break-word;
          }

          /* ── Stats grid ── */
          .uth-stats-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.875rem;
          }

          @media (min-width: 1024px) {
            .uth-stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }

          /* ── Stat card ── */
          .uth-stat-card {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            padding: 1.125rem;
            min-width: 0;
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
            font-size: clamp(0.9rem, 2.5vw, 1.4rem);
            font-weight: 700;
            font-family: var(--font-mono);
            line-height: 1.15;
            overflow-wrap: break-word;
            word-break: break-word;
          }

          .uth-stat-sub {
            font-size: 0.68rem;
            font-family: var(--font-mono);
            color: hsl(var(--muted-foreground));
            overflow-wrap: break-word;
          }

          /* ── Inline code ── */
          .uth-code {
            font-family: var(--font-mono);
            font-size: 0.82em;
            background: color-mix(in srgb, currentColor 10%, transparent);
            padding: 0.1em 0.35em;
            border-radius: 4px;
            overflow-wrap: break-word;
            word-break: break-all;
          }
        `}</style>
      </section>
    </PageFade>
  )
}
