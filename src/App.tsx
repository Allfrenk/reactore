import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { HomePage } from '@/pages/HomePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <AppShell header={<Header />} sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AppShell>
  )
}

export default App
