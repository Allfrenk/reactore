type ActionCardProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function ActionCard({
  title,
  subtitle,
  children,
  className = '',
}: ActionCardProps) {
  return (
    <section
      className={`border-border/70 rounded-2xl border bg-(--bg-surface) p-6 shadow-[0_10px_30px_rgb(0_0_0/0.10)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(0_0_0/0.14),0_0_0_1px_rgb(var(--accent-primary)/0.20)] ${className} `}
    >
      <header className="mb-5 flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </header>

      <div className="min-w-0">{children}</div>
    </section>
  )
}
