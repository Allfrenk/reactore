import { loginWithGithub, loginWithGoogle } from '@/lib/auth/auth.actions'

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-main) px-4">
      <div className="glass-card w-full max-w-sm space-y-8 p-8 text-center">
        {/* LOGO */}
        <div className="flex justify-center">
          <h1 className="header-title text-3xl leading-none">
            <span>react</span>
            <span className="font-extrabold text-(--accent-primary)">ore</span>
          </h1>
        </div>

        {/* SUBTITLE */}
        <p className="text-muted-foreground text-sm">Sign in to continue</p>

        {/* ACTIONS */}
        <div className="space-y-3">
          {/* GOOGLE */}
          <button
            onClick={() => void loginWithGoogle()}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {/* icona semplice, sostituibile */}
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
        </div>

        {/* FOOTER */}
        <p className="text-muted-foreground text-xs">
          Authentication required to access the app
        </p>
      </div>
    </div>
  )
}
