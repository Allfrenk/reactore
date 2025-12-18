import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExplainCard } from './ExplainCard'

describe('ExplainCard', () => {
  it('renders title and explanation', () => {
    renderWithProviders(
      <ExplainCard title="How it works">
        <p>Explanation text</p>
      </ExplainCard>
    )

    expect(screen.getByText('How it works')).toBeInTheDocument()
    expect(screen.getByText('Explanation text')).toBeInTheDocument()
  })
})
