import { LoginPage } from '@/features/login/LoginPage'
import { PageFade } from '@/shared/components/ui/PageFade'
import { useAuth } from '@/shared/hooks/useAuth'

type AuthGateProps = {
  children: React.ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, loading } = useAuth()
  const AUTH_BYPASS = false

  // bypass per sviluppo
  if (AUTH_BYPASS) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking authentication…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <PageFade slow>
        <LoginPage />
      </PageFade>
    )
  }

  return <>{children}</>
}
