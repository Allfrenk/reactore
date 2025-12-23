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

    if (password !== import.meta.env.VITE_RECRUITER_PASSWORD) {
      setError('Invalid recruiter password')
      return
    }

    try {
      await loginAsRecruiter()
    } catch {
      setError('Recruiter login failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-main) px-4">
      <div className="glass-card flex min-h-[420px] w-full max-w-sm flex-col p-8 text-center">
        {/* HEADER — FISSO */}
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

        {/* CONTENT — AREA STABILE */}
        <div className="flex flex-1 items-center justify-center">
          {!recruiterOpen ? (
            <div className="w-full space-y-3">
              {/* GOOGLE */}
              <button
                onClick={() => void loginWithGoogle()}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                <span className="text-base font-bold">G</span>
                Continue with Google
              </button>

              {/* GITHUB */}
              <button
                onClick={() => void loginWithGithub()}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                <span className="text-base font-bold">GH</span>
                Continue with GitHub
              </button>

              {/* RECRUITER */}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Recruiter password"
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

              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>
          )}
        </div>

        {/* FOOTER — FISSO */}
        <p className="text-muted-foreground text-xs">
          Authentication required to access the app
        </p>
      </div>
    </div>
  )
}
