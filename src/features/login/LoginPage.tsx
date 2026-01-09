import {
  loginAsRecruiter,
  loginWithGithub,
  loginWithGoogle,
} from '@/features/auth/auth.actions'
import { useState } from 'react'

export function LoginPage() {
  const [recruiterOpen, setRecruiterOpen] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  /* =========================
     Recruiter Login
  ========================== */

  const handleRecruiterLogin = async () => {
    setError(null)
    setLoading(true)

    if (!displayName.trim()) {
      setError('Please enter your name')
      setLoading(false)
      return
    }

    if (!company.trim()) {
      setError('Please enter your company')
      setLoading(false)
      return
    }

    if (!password.trim()) {
      setError('Please enter the recruiter password')
      setLoading(false)
      return
    }

    try {
      await loginAsRecruiter({
        displayName,
        company,
        password: password.trim(),
      })
      // SUCCESS → AuthGate gestisce il redirect
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err) {
        switch (err.code) {
          case 'auth/wrong-password':
            setError('Wrong recruiter password')
            break
          case 'auth/too-many-requests':
            setError('Too many attempts. Please try again later.')
            break
          default:
            setError('Recruiter login failed')
        }
      } else {
        setError('Recruiter login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     Standard Login
  ========================== */

  const handleGithubLogin = async () => {
    setError(null)
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      await loginWithGoogle()
    } catch {
      setError('Google login failed')
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     UI
  ========================== */

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
                disabled={loading}
                onClick={() => void handleGoogleLogin()}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
                <span className="text-base font-bold">G</span>
                {loading ? 'Signing in…' : 'Continue with Google'}
              </button>

              <button
                disabled={loading}
                onClick={() => void handleGithubLogin()}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60"
              >
                <span className="text-base font-bold">GH</span>
                {loading ? 'Signing in…' : 'Continue with GitHub'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setRecruiterOpen(true)
                  setError(null)
                }}
                className="text-muted-foreground hover:text-foreground mt-4 text-xs underline underline-offset-4"
              >
                Are you a recruiter?
              </button>
            </div>
          ) : (
            /* 🔐 FORM RECRUITER — fondamentale per il password manager */
            <form
              className="mt-4 w-full space-y-5"
              onSubmit={e => {
                e.preventDefault()
                void handleRecruiterLogin()
              }}
            >
              <input
                disabled={loading}
                type="text"
                name="username"
                autoComplete="username"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="border-border/50 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--accent-primary)/30"
              />

              <input
                disabled={loading}
                type="text"
                name="organization"
                autoComplete="organization"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Company"
                className="border-border/50 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--accent-primary)/30"
              />

              <input
                disabled={loading}
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Recruiter password"
                className="border-border/50 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--accent-primary)/30"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-(--accent-primary) px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? 'Entering…' : 'Enter as Recruiter'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setRecruiterOpen(false)
                  setDisplayName('')
                  setCompany('')
                  setPassword('')
                  setError(null)
                }}
                className="text-muted-foreground hover:text-foreground mt-4 text-xs underline underline-offset-4"
              >
                Back to normal login
              </button>
            </form>
          )}
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        {recruiterOpen && (
          <p className="text-muted-foreground mt-4 text-xs">
            Recruiter access is tracked for analytics. Hook persistence is available for
            standard users.
          </p>
        )}
      </div>
    </div>
  )
}
