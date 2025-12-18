import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UseStatePage } from './UseStatePage'

describe('UseStatePage', () => {
  it('renders the page title', () => {
    renderWithProviders(<UseStatePage />)

    expect(screen.getByRole('heading', { name: /usestate/i })).toBeInTheDocument()
  })
})
