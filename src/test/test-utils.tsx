import { configureStore } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import layoutReducer from '@/slices/layoutSlice'
import themeReducer from '@/slices/themeSlice'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: {
    theme?: ReturnType<typeof themeReducer>
    layout?: ReturnType<typeof layoutReducer>
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
