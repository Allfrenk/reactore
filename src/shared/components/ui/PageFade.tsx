type PageFadeProps = {
  children: React.ReactNode
  slow?: boolean
}

export function PageFade({ children, slow = false }: PageFadeProps) {
  return (
    <div className={`animate-fade-in ${slow ? 'animate-fade-slow' : ''}`}>{children}</div>
  )
}
