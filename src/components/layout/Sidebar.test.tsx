import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/test-utils'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders Home navigation link', () => {
    renderWithProviders(<Sidebar />)

    const homeLink = screen.getByLabelText(/home/i)
    expect(homeLink).toBeInTheDocument()
  })
})

it('marks Home link as active when route is "/"', () => {
  renderWithProviders(<Sidebar />, {
    route: '/',
  })

  const homeLink = screen.getByLabelText(/home/i)
  expect(homeLink.className).toContain('text-(--accent-primary)')
})
