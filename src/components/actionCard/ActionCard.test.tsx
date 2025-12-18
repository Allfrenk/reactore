import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ActionCard } from './ActionCard'

describe('ActionCard', () => {
  it('renders title and content', () => {
    renderWithProviders(
      <ActionCard title="Demo">
        <span>Content</span>
      </ActionCard>
    )

    expect(screen.getByText('Demo')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
