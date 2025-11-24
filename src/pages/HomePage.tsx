import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="text-center flex felx-row justify-center gap-2 mt-2">
      <Link to="/hooks-demo">
        <button className="px-6 py-3 text-white rounded">Go to Hooks Demo</button>
      </Link>
      <Link to="/features-page">
        <button className="px-6 py-3 text-white rounded">Go to Features Pge</button>
      </Link>
    </div>
  )
}
