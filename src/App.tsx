import { Route, Routes } from 'react-router-dom'

import { AuthBootstrap } from '@/core/auth/AuthBootstrap'
import { AuthGate } from '@/core/auth/AuthGate'
import { AppShell } from '@/shared/components/layout/AppShell'
import { Header } from '@/shared/components/layout/Header'
import { Sidebar } from '@/shared/components/layout/Sidebar'

import { UseCallbackPage } from './features/hooks-playground/useCallback/UseCallbackPage'
import { UseEffectPage } from './features/hooks-playground/useEffect/UseEffectPage'
import { UseMemoPage } from './features/hooks-playground/useMemo/UseMemoPage'
import { UseStatePage } from './features/hooks-playground/useState/UseStatePage'
import { HomePage } from './pages/home/HomePage'

function App() {
  return (
    <AuthBootstrap>
      <AuthGate>
        <AppShell header={<Header />} sidebar={<Sidebar />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hooks/useState/*" element={<UseStatePage />} />
            <Route path="/hooks/useEffect/*" element={<UseEffectPage />} />
            <Route path="/hooks/useMemo/*" element={<UseMemoPage />} />
            <Route path="/hooks/useCallback/*" element={<UseCallbackPage />} />
          </Routes>
        </AppShell>
      </AuthGate>
    </AuthBootstrap>
  )
}

export default App
