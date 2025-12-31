import { useAppSelector } from '@/core/app/hooks'

export function useAuth() {
  const user = useAppSelector(state => state.user.user)
  const loading = useAppSelector(state => state.user.loading)

  return { user, loading }
}
