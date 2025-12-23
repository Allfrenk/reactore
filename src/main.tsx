import { AuthBootstrap } from '@/core/auth/AuthBootstrap'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { store } from './core/app/store'

import './index.css'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { ThemeBootstrap } from './core/theme/ThemeBootstrap'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeBootstrap>
        <AuthBootstrap>
          <App />
        </AuthBootstrap>
      </ThemeBootstrap>
    </BrowserRouter>
  </Provider>
)
