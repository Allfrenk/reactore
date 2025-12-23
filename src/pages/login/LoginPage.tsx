import {
  loginAsRecruiter,
  loginWithGithub,
  loginWithGoogle,
} from '@/lib/auth/auth.actions'
import { useState } from 'react'

export function LoginPage() {
  const [recruiterOpen, setRecruiterOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleRecruiterLogin = async () => {
    setError(null)

    const input = password.trim()
    const expected = (
      import.meta.env.VITE_RECRUITER_PASSWORD as string | undefined
    )?.trim()

    if (!expected || input !== expected) {
      setError('Invalid recruiter password')
      return
    }

    try {
      await loginAsRecruiter()
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'code' in err &&
        err.code !== 'auth/popup-closed-by-user'
      ) {
        setError('Recruiter login failed')
      }
    }
  }

  const handleGithubLogin = async () => {
    setError(null)
    try {
      await loginWithGithub()
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        err.message === 'ACCOUNT_EXISTS_WITH_DIFFERENT_PROVIDER'
      ) {
        setError(
          'This email is already associated with another login method. Please use the original provider.'
        )
      } else {
        setError('GitHub login failed')
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-main) px-4">
      <div className="glass-card flex min-h-[420px] w-full max-w-sm flex-col p-8 text-center">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <h1 className="header-title text-3xl leading-none">
              <span>react</span>
              <span className="font-extrabold text-(--accent-primary)">ore</span>
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            {recruiterOpen ? 'Recruiter access' : 'Sign in to continue'}
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center">
          {!recruiterOpen ? (
            <div className="w-full space-y-3">
              <button
                onClick={() => void loginWithGoogle()}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                <span className="text-base font-bold">G</span>
                Continue with Google
              </button>

              <button
                onClick={() => void handleGithubLogin()}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                <span className="text-base font-bold">GH</span>
                Continue with GitHub
              </button>

              <button
                type="button"
                onClick={() => setRecruiterOpen(true)}
                className="text-muted-foreground hover:text-foreground mt-4 text-xs underline underline-offset-4"
              >
                Are you a recruiter?
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <input
                type="password"
                name="recruiter-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Recruiter password"
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className="border-border/50 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--accent-primary)/30"
              />

              <button
                type="button"
                onClick={() => void handleRecruiterLogin()}
                className="flex w-full items-center justify-center rounded-xl bg-(--accent-primary) px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Enter as Recruiter
              </button>

              <button
                type="button"
                onClick={() => {
                  setRecruiterOpen(false)
                  setPassword('')
                  setError(null)
                }}
                className="text-muted-foreground hover:text-foreground mt-4 text-xs underline underline-offset-4"
              >
                Back to normal login
              </button>
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        {/* FOOTER */}
        <p className="text-muted-foreground text-xs">
          Authentication required to access the app
        </p>
      </div>
    </div>
  )
}
