type SpinnerReactoreProps = {
  size?: number
  duration?: number // ms, se assente → infinito
}

export function SpinnerReactore({ size = 40, duration }: SpinnerReactoreProps) {
  return (
    <div
      style={{
        width: size,
        aspectRatio: '1',
        borderRadius: '50%',
        background: `
          radial-gradient(
            farthest-side,
            var(--accent-primary) 95%,
            transparent
          ) 50% 2px / 10px 10px no-repeat,
          radial-gradient(
            farthest-side,
            transparent calc(100% - 14px),
            rgba(255,255,255,0.12) 0
          )
        `,
        animation: `reactore-spin ${
          duration ? `${duration}ms` : '2s'
        } linear ${duration ? 1 : 'infinite'}`,
      }}
    />
  )
}
