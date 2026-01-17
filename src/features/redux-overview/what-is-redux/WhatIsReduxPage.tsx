export function WhatIsReduxPage() {
  return (
    <section className="page-wrapper">
      <header className="page-header">
        <h1>Redux Overview</h1>
        <p className="page-subtitle">
          A high-level overview of Redux and how it works inside Reactore.
        </p>
      </header>

      {/* Placeholder – diagram / cards */}
      <div className="mt-12 space-y-6 opacity-40">
        <div className="h-40 rounded-xl border border-dashed border-(--border-soft)" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-32 rounded-xl border border-dashed border-(--border-soft)" />
          <div className="h-32 rounded-xl border border-dashed border-(--border-soft)" />
          <div className="h-32 rounded-xl border border-dashed border-(--border-soft)" />
        </div>
      </div>
    </section>
  )
}
