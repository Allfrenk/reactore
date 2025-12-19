import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/pages/login/LoginPage'

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
    return <LoginPage />
  }

  return <>{children}</>
}
