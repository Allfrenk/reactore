import { useAppDispatch } from '@/core/app/hooks'
import {
  loginAsRecruiter,
  loginWithGithub,
  loginWithGoogle,
} from '@/features/auth/auth.actions'
import { setDemoMode } from '@/state/userSlice'
import { useState } from 'react'

type Panel = 'demo' | 'recruiter' | null

export function LoginPage() {
  const dispatch = useAppDispatch()
  const [panel, setPanel] = useState<Panel>(null)
  const [displayName, setDisplayName] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [githubNeedsLogout, setGithubNeedsLogout] = useState(false)

  const resetPanel = () => {
    setPanel(null)
    setDisplayName('')
    setCompany('')
    setPassword('')
    setError(null)
  }

  /* =========================
     Demo Mode Entry
  ========================== */

  const handleDemoLogin = () => {
    if (!displayName.trim()) {
      setError('Please enter your name')
      return
    }

    dispatch(
      setDemoMode({
        displayName: displayName.trim(),
        company: company.trim(),
      })
    )
  }

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
      setError('Please enter the access password')
      setLoading(false)
      return
    }

    try {
      await loginAsRecruiter({
        displayName,
        company,
        password,
      })
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err) {
        switch (String(err.code)) {
          case 'auth/wrong-password':
            setError('Wrong access password.')
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
    setGithubNeedsLogout(false)
    try {
      await loginWithGithub()
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err) {
        const code = String(err.code)
        if (
          code === 'auth/account-exists-with-different-credential' ||
          code === 'auth/account-exists-with-different-provider'
        ) {
          setError(
            'This email is already associated with another login method. Please use the original provider.'
          )
          setGithubNeedsLogout(true)
          return
        }
      }

      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        err.message === 'ACCOUNT_EXISTS_WITH_DIFFERENT_PROVIDER'
      ) {
        setError(
          'This email is already associated with another login method. Please use the original provider.'
        )
        setGithubNeedsLogout(true)
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
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err) {
        const code = String(err.code)
        if (
          code === 'auth/account-exists-with-different-credential' ||
          code === 'auth/account-exists-with-different-provider'
        ) {
          setError(
            'This email is already associated with another login method. Please use the original provider.'
          )
          return
        }
      }

      setError('Google login failed')
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     Subtitle per panel
  ========================== */

  const subtitle =
    panel === 'demo'
      ? 'Session-only — no account needed'
      : panel === 'recruiter'
        ? 'Recruiter access'
        : 'Sign in to continue'

  /* =========================
     UI
  ========================== */

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--bg-main) px-4 pb-4">
      {/* INTRO */}
      <div className="mb-6 max-w-sm text-center">
        <p className="text-xl font-medium">
          Explore Reactore in{' '}
          <span className="font-semibold text-(--accent-primary)">demo mode</span>
        </p>
        <p className="text-muted-foreground mt-1 text-lg">
          No personal data is stored. Login is required to interact with the app.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="glass-card flex min-h-[420px] w-full max-w-sm flex-col p-8 text-center">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <h1 className="header-title text-3xl leading-none">
              <span>react</span>
              <span className="font-extrabold text-(--accent-primary)">ore</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center">
          {/* ── MAIN: Google + GitHub ── */}
          {panel === null && (
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

              {githubNeedsLogout && (
                <button
                  type="button"
                  onClick={() =>
                    window.open('https://github.com/logout', '_blank', 'noopener,noreferrer')
                  }
                  className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
                >
                  Use another GitHub account
                </button>
              )}

              <div className="flex flex-col gap-1 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setPanel('demo')
                    setError(null)
                  }}
                  className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
                >
                  Try Demo Mode
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPanel('recruiter')
                    setError(null)
                  }}
                  className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
                >
                  Are you a recruiter?
                </button>
              </div>
            </div>
          )}

          {/* ── DEMO FORM ── */}
          {panel === 'demo' && (
            <form
              className="mt-4 w-full space-y-4"
              onSubmit={e => {
                e.preventDefault()
                handleDemoLogin()
              }}
            >
              <input
                type="text"
                name="username"
                autoComplete="name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="border-border/50 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--accent-primary)/30"
              />

              <input
                type="text"
                name="organization"
                autoComplete="organization"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Company (optional)"
                className="border-border/50 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--accent-primary)/30"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-(--accent-primary) px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Enter Demo
              </button>

              <button
                type="button"
                onClick={resetPanel}
                className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
              >
                Back
              </button>
            </form>
          )}

          {/* ── RECRUITER FORM ── */}
          {panel === 'recruiter' && (
            <form
              className="mt-4 w-full space-y-4"
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
                name="current-password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Access password"
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
                onClick={resetPanel}
                className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
              >
                Back
              </button>
            </form>
          )}
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        {panel === 'demo' && (
          <p className="text-muted-foreground mt-4 text-xs">
            Session-only — no data is saved or linked to your identity.
          </p>
        )}
        {panel === 'recruiter' && (
          <p className="text-muted-foreground mt-4 text-xs">
            Recruiter access is tracked for analytics.
          </p>
        )}
      </div>
    </div>
  )
}
