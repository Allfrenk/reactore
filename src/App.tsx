import { AuthGate } from '@/auth/AuthGate'
import { AppShell } from '@/components/appShell/AppShell'
import { Header } from '@/components/general/header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { UseStatePage } from './pages/hooks-playground/useStatePage/UseStatePage'

function App() {
  return (
    <AuthGate>
      <AppShell header={<Header />} sidebar={<Sidebar />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hooks/useState/*" element={<UseStatePage />} />
        </Routes>
      </AppShell>
    </AuthGate>
  )
}

export default App
