type RoadmapItem = {
  title: string
  description: string
  date: string
}

// ─── LEGACY — kept for historical reference ───────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const roadmapLegacy: RoadmapItem[] = [
  {
    title: 'useState',
    description: 'Understanding state, updates and re-rendering.',
    date: 'Done',
  },
  {
    title: 'useEffect',
    description: 'Side effects, lifecycle and dependency management.',
    date: 'Done',
  },
  {
    title: 'useMemo',
    description: 'Memoized values and expensive computation.',
    date: 'Done',
  },
  {
    title: 'useCallback',
    description: 'Stable callback references and child re-renders.',
    date: 'Done',
  },
  {
    title: 'Redux Store',
    description: 'Global state and mental models.',
    date: 'Done',
  },
  {
    title: 'Custom Hook Creator',
    description: 'Generate reusable hooks from real scenarios.',
    date: 'by 06/2026',
  },
]

// ─── CURRENT ──────────────────────────────────────────────────────────────────
const roadmapCurrent: RoadmapItem[] = [
  {
    title: 'useState',
    description: 'Understanding state, updates and re-rendering.',
    date: 'Done',
  },
  {
    title: 'useEffect',
    description: 'Side effects, lifecycle and dependency management.',
    date: 'Done',
  },
  {
    title: 'useMemo',
    description: 'Memoized values and expensive computation.',
    date: 'Done',
  },
  {
    title: 'useCallback',
    description: 'Stable callback references and child re-renders.',
    date: 'Done',
  },
  {
    title: 'Redux Store',
    description: 'Global state and mental models.',
    date: 'Done',
  },
  {
    title: 'useRef',
    description: 'DOM access and mutable values without re-renders.',
    date: 'Done',
  },
  {
    title: 'useReducer',
    description: 'Reducer-driven state transitions and action patterns.',
    date: 'Done',
  },
  {
    title: 'useContext',
    description: 'Shared state across a subtree without prop drilling.',
    date: 'Done',
  },
  {
    title: 'Custom Hook Creator',
    description: 'Generate reusable hooks from real scenarios.',
    date: 'by 06/2026',
  },
]

export function RoadmapSection() {
  const roadmap = roadmapCurrent

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
          const isDone = item.date === 'Done'
          return (
            <div
              key={item.title}
              className={`contents ${
                index === 0 ? 'pt-6' : ''
              } ${index === roadmap.length - 1 ? 'pb-6' : ''}`}
            >
              {/* DOT */}
              <div className="col-start-1 flex justify-center">
                <span
                  className={`relative z-10 mt-1 h-3 w-3 rounded-full ${
                    isDone ? 'bg-(--accent-primary)' : 'border-2 border-(--text-muted) bg-(--bg-main)'
                  }`}
                >
                  {isDone && (
                    <span className="absolute -inset-1.5 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_20%,transparent)]" />
                  )}
                </span>
              </div>

              {/* MOBILE CONTENT */}
              <div className="col-start-2 md:hidden">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-mono text-sm ${!isDone ? 'text-muted-foreground' : ''}`}>
                    {item.title}
                  </span>
                  <span className={`font-mono text-xs ${isDone ? 'text-(--accent-primary)' : 'text-muted-foreground'}`}>
                    {item.date}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>

              {/* DESKTOP / TABLET CONTENT */}
              <div className={`col-start-2 hidden font-mono text-sm md:block ${!isDone ? 'text-muted-foreground' : ''}`}>
                {item.title}
              </div>
              <div className="text-muted-foreground col-start-3 hidden text-sm md:block">
                {item.description}
              </div>
              <div className={`col-start-4 hidden text-right font-mono text-xs md:block ${isDone ? 'text-(--accent-primary)' : 'text-muted-foreground'}`}>
                {item.date}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
