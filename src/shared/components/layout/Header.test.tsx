import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('renders the app logo and username', () => {
    renderWithProviders(<Header />)

    // logo
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('ore')).toBeInTheDocument()

    // username
    expect(screen.getByText(/ciao Alessandro/i)).toBeInTheDocument()
  })

  it('toggles sidebar when header toggle is clicked', async () => {
    const user = userEvent.setup()

    const { store } = renderWithProviders(<Header />, {
      preloadedState: {
        layout: { sidebarOpen: false },
      },
    })

    const toggle = screen.getByLabelText(/toggle sidebar/i)
    await user.click(toggle)

    expect(store.getState().layout.sidebarOpen).toBe(true)
  })
})
