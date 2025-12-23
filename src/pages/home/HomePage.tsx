import { PageFade } from '@/shared/components/ui/PageFade'

export function HomePage() {
  return (
    <PageFade>
      <div>
        <h1 className="text-3xl font-semibold">Home</h1>
        <p className="text-muted-foreground mt-2">React&nbsp;19 demo playground</p>
      </div>
    </PageFade>
  )
}
