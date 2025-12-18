import { AppShell } from '@/components/appShell/AppShell'
import { Header } from '@/components/header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { UseStatePage } from './pages/hooks/UseStatePage'

function App() {
  return (
    <AppShell header={<Header />} sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hooks/useState*" element={<UseStatePage />} />
      </Routes>
    </AppShell>
  )
}

export default App
