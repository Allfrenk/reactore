import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders title and description', () => {
    renderWithProviders(<HomePage />)

    expect(screen.getByRole('heading', { name: /didactic/i })).toBeInTheDocument()
  })
})
