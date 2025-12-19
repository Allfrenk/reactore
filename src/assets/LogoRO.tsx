type LogoROProps = {
  size?: 'sm' | 'md' | 'lg'
}

export function LogoRO({ size = 'md' }: LogoROProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <span className={`font-inter flex items-center leading-none ${sizes[size]}`}>
      <span className="font-medium text-(--text-primary)">r</span>
      <span className="font-extrabold text-(--accent-primary)">o</span>
    </span>
  )
}
