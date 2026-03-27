import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthGate } from '@/core/auth/AuthGate'
import { AppShell } from '@/shared/components/layout/AppShell'
import { Header } from '@/shared/components/layout/Header'
import { Sidebar } from '@/shared/components/layout/Sidebar'
import { PageLoader } from '@/shared/components/ui/PageLoader'

import { OpenRedirectPage } from './open-redirect/OpenRedirectPage'

// ── Lazy-loaded routes ─────────────────────────────────────────────────────
// Each page is a separate JS chunk loaded on demand.
const HomePage = lazy(() =>
  import('./pages/home/HomePage').then(({ HomePage }) => ({ default: HomePage }))
)

// Hooks playground
const UseStatePage = lazy(() =>
  import('./features/hooks-playground/useState/UseStatePage').then(({ UseStatePage }) => ({
    default: UseStatePage,
  }))
)
const UseEffectPage = lazy(() =>
  import('./features/hooks-playground/useEffect/UseEffectPage').then(({ UseEffectPage }) => ({
    default: UseEffectPage,
  }))
)
const UseMemoPage = lazy(() =>
  import('./features/hooks-playground/useMemo/UseMemoPage').then(({ UseMemoPage }) => ({
    default: UseMemoPage,
  }))
)
const UseCallbackPage = lazy(() =>
  import('./features/hooks-playground/useCallback/UseCallbackPage').then(
    ({ UseCallbackPage }) => ({ default: UseCallbackPage })
  )
)
const UseRefPage = lazy(() =>
  import('./features/hooks-playground/useRef/UseRefPage').then(({ UseRefPage }) => ({
    default: UseRefPage,
  }))
)
const UseReducerPage = lazy(() =>
  import('./features/hooks-playground/useReducer/UseReducerPage').then(({ UseReducerPage }) => ({
    default: UseReducerPage,
  }))
)
const UseContextPage = lazy(() =>
  import('./features/hooks-playground/useContext/UseContextPage').then(({ UseContextPage }) => ({
    default: UseContextPage,
  }))
)

// Redux overview
const WhatIsReduxPage = lazy(() =>
  import('./features/redux-overview/what-is-redux/WhatIsReduxPage').then(
    ({ WhatIsReduxPage }) => ({ default: WhatIsReduxPage })
  )
)
const YourStorePage = lazy(() =>
  import('./features/redux-overview/your-store/YourStorePage').then(({ YourStorePage }) => ({
    default: YourStorePage,
  }))
)

// Under the Hood
const UnderTheHoodPage = lazy(() =>
  import('./features/under-the-hood/UnderTheHoodPage').then(({ UnderTheHoodPage }) => ({
    default: UnderTheHoodPage,
  }))
)

function App() {
  return (
    <Routes>
      {/* SYSTEM / PUBLIC ROUTE */}
      <Route path="/open" element={<OpenRedirectPage />} />

      {/* APP ROUTES */}
      <Route
        path="/*"
        element={
          <AuthGate>
            <AppShell header={<Header />} sidebar={<Sidebar />}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />

                  {/* HOOKS PLAYGROUND */}
                  <Route path="/hooks/useState/*" element={<UseStatePage />} />
                  <Route path="/hooks/useEffect/*" element={<UseEffectPage />} />
                  <Route path="/hooks/useMemo/*" element={<UseMemoPage />} />
                  <Route path="/hooks/useCallback/*" element={<UseCallbackPage />} />
                  <Route path="/hooks/useRef/*" element={<UseRefPage />} />
                  <Route path="/hooks/useReducer/*" element={<UseReducerPage />} />
                  <Route path="/hooks/useContext/*" element={<UseContextPage />} />

                  {/* REDUX OVERVIEW */}
                  <Route path="/redux/what-is-redux/*" element={<WhatIsReduxPage />} />
                  <Route path="/redux/your-store/*" element={<YourStorePage />} />

                  {/* UNDER THE HOOD */}
                  <Route path="/stack/*" element={<UnderTheHoodPage />} />

                  {/* CATCH-ALL → home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </AppShell>
          </AuthGate>
        }
      />
    </Routes>
  )
}

export default App
