import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserCard from './components/UserCard'
import { Route, Routes } from 'react-router-dom'
import HooksPlaygroundPage from './pages/HooksPlaygroundPage'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'

function App() {
  return (
    <>
      <div className="flex flex-row gap-1">
        <img src={viteLogo} className="logo text-5xl" alt="Vite logo" />
        <img src={reactLogo} className="logo react text-5xl" alt="React logo" />
      </div>
      <UserCard />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hooks-demo" element={<HooksPlaygroundPage />} />
        <Route path="/features-page" element={<FeaturesPage />} />
      </Routes>
    </>
  )
}

export default App
