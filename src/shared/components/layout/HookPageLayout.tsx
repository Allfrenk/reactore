type HookPageLayoutProps = {
  title: string
  description?: string
  action: React.ReactNode
  explanation: React.ReactNode
}

export function HookPageLayout({
  title,
  description,
  action,
  explanation,
}: HookPageLayoutProps) {
  return (
    <section className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </header>

      {/* Content */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {action}
        {explanation}
      </div>
    </section>
  )
}
