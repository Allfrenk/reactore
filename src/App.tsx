import { Route, Routes } from 'react-router-dom'

import { AuthBootstrap } from '@/core/auth/AuthBootstrap'
import { AuthGate } from '@/core/auth/AuthGate'
import { AppShell } from '@/shared/components/layout/AppShell'
import { Header } from '@/shared/components/layout/Header'
import { Sidebar } from '@/shared/components/layout/Sidebar'

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
          </Routes>
        </AppShell>
      </AuthGate>
    </AuthBootstrap>
  )
}

export default App
