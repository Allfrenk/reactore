import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UseEffectPage } from './UseEffectPage'

describe('UseEffectPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<UseEffectPage />)

    expect(screen.getByRole('heading', { name: /useeffect/i })).toBeInTheDocument()
  })
})
