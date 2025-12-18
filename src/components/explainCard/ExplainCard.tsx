type ExplainCardProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function ExplainCard({
  title,
  subtitle,
  children,
  className = '',
}: ExplainCardProps) {
  return (
    <section
      className={`glass-card rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(0_0_0/0.14),0_0_0_1px_rgb(var(--accent-primary)/0.22)] ${className} `}
    >
      <header className="mb-5 flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-(--text-primary)">
          {title}
        </h2>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </header>

      <div className="space-y-3 text-sm leading-relaxed text-(--text-secondary)">
        {children}
      </div>
    </section>
  )
}
