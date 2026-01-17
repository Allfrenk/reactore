import { Route, Routes } from 'react-router-dom'

import { AuthGate } from '@/core/auth/AuthGate'
import { AppShell } from '@/shared/components/layout/AppShell'
import { Header } from '@/shared/components/layout/Header'
import { Sidebar } from '@/shared/components/layout/Sidebar'

import { UseCallbackPage } from './features/hooks-playground/useCallback/UseCallbackPage'
import { UseEffectPage } from './features/hooks-playground/useEffect/UseEffectPage'
import { UseMemoPage } from './features/hooks-playground/useMemo/UseMemoPage'
import { UseStatePage } from './features/hooks-playground/useState/UseStatePage'
import { WhatIsReduxPage } from './features/redux-overview/what-is-redux/WhatIsReduxPage'
import { YourStorePage } from './features/redux-overview/your-store/YourStorePage'
import { HomePage } from './pages/home/HomePage'

function App() {
  return (
    <AuthGate>
      <AppShell header={<Header />} sidebar={<Sidebar />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* HOOKS PLAYGROUND */}
          <Route path="/hooks/useState/*" element={<UseStatePage />} />
          <Route path="/hooks/useEffect/*" element={<UseEffectPage />} />
          <Route path="/hooks/useMemo/*" element={<UseMemoPage />} />
          <Route path="/hooks/useCallback/*" element={<UseCallbackPage />} />
          {/* REDUX OVERVIEW */}
          <Route path="/redux/what-is-redux/*" element={<WhatIsReduxPage />} />
          <Route path="/redux/your-store/*" element={<YourStorePage />} />
        </Routes>
      </AppShell>
    </AuthGate>
  )
}

export default App
