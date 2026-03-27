import { configureStore } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import hooksReducer from '@/state/hooksSlice'
import layoutReducer from '@/state/layoutSlice'
import themeReducer from '@/state/themeSlice'
import userReducer from '@/state/userSlice'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: {
    theme?: ReturnType<typeof themeReducer>
    layout?: ReturnType<typeof layoutReducer>
    user?: ReturnType<typeof userReducer>
    hooks?: ReturnType<typeof hooksReducer>
  }
  route?: string
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = '/', ...renderOptions }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
      layout: layoutReducer,
      user: userReducer,
      hooks: hooksReducer,
    },
    preloadedState: preloadedState as Parameters<
      typeof configureStore
    >[0]['preloadedState'],
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
      renderOptions
    ),
  }
}
