import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/test-utils'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders Home and Hooks Playground section', () => {
    renderWithProviders(<Sidebar />)

    expect(screen.getByLabelText(/home/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hooks playground/i)).toBeInTheDocument()
    expect(screen.getByText(/hooks playground/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/usestate/i)).toBeInTheDocument()
  })

  it('activates Code icon when a hooks child route is active', () => {
    renderWithProviders(<Sidebar />, {
      route: '/hooks/useState',
    })

    const codeIcon = screen.getByLabelText(/hooks playground/i)
    expect(codeIcon.className).toContain('bg-(--accent-primary)')
    expect(codeIcon.className).toContain('text-(--accent-primary)')
  })

  it('highlights useState text when active', () => {
    renderWithProviders(<Sidebar />, {
      route: '/hooks/useState',
    })

    const useStateLink = screen.getByLabelText(/usestate/i)
    expect(useStateLink.className).toContain('text-(--accent-primary)')
  })

  it('does NOT highlight Hooks Playground title when a child is active', () => {
    renderWithProviders(<Sidebar />, {
      route: '/hooks/useState',
    })

    const title = screen.getByText(/hooks playground/i)
    expect(title.className).toContain('text-muted-foreground')
  })
})
