type RoadmapItem = {
  title: string
  description: string
  date: string
}

export function RoadmapSection() {
  const roadmap: RoadmapItem[] = [
    {
      title: 'useState',
      description: 'Understanding state, updates and re-rendering.',
      date: 'Done',
    },
    {
      title: 'useEffect',
      description: 'Side effects, lifecycle and dependency management.',
      date: 'by 12/2025',
    },
    {
      title: 'Custom Hook Creator',
      description: 'Generate reusable hooks from real scenarios.',
      date: 'by 02/2026',
    },
    {
      title: 'Redux Store',
      description: 'Global state and mental models.',
      date: 'by 04/2026',
    },
  ]

  return (
    <section className="mt-16">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Programmed features</h2>
        <p className="text-muted-foreground text-sm">Planned evolution of Reactore</p>
      </header>

      {/* GRID ROOT */}
      <div className="relative grid grid-cols-[10%_90%] gap-y-10 md:grid-cols-[10%_30%_30%_30%]">
        {/* TIMELINE LINE */}
        <div className="pointer-events-none absolute -top-6 -bottom-6 left-[5%] flex -translate-x-1/2 flex-col items-center">
          {/* TOP DASHED */}
          <div className="h-8 border-l-2 border-dashed border-(--text-muted) opacity-60" />

          {/* SOLID */}
          <div className="flex-1 border-l-2 border-solid border-(--text-muted) opacity-60" />

          {/* BOTTOM DASHED */}
          <div className="h-8 border-l-2 border-dashed border-(--text-muted) opacity-60" />
        </div>

        {roadmap.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === roadmap.length - 1
          return (
            <div
              key={item.title}
              className={`contents ${
                index === 0 ? 'pt-6' : ''
              } ${index === roadmap.length - 1 ? 'pb-6' : ''}`}
            >
              {/* DOT */}
              <div className={`col-start-1 flex justify-center`}>
                <span className="relative z-10 mt-1 h-3 w-3 rounded-full bg-(--accent-primary)">
                  <span className="absolute -inset-1.5 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_20%,transparent)]" />
                </span>
              </div>

              {/* MOBILE CONTENT */}
              <div className="col-start-2 md:hidden">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-sm">{item.title}</span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {item.date}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>

              {/* DESKTOP / TABLET CONTENT */}
              <div className="col-start-2 hidden font-mono text-sm md:block">
                {item.title}
              </div>
              <div className="text-muted-foreground col-start-3 hidden text-sm md:block">
                {item.description}
              </div>
              <div className="text-muted-foreground col-start-4 hidden text-right font-mono text-xs md:block">
                {item.date}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
