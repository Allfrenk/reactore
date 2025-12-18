import { renderWithProviders } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HookPageLayout } from './HookPageLayout'

describe('HookPageLayout', () => {
  it('renders title, description and slots', () => {
    renderWithProviders(
      <HookPageLayout
        title="useState"
        description="Managing local state"
        action={<div>Action</div>}
        explanation={<div>Explanation</div>}
      />
    )

    expect(screen.getByRole('heading', { name: /usestate/i })).toBeInTheDocument()

    expect(screen.getByText(/managing local state/i)).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Explanation')).toBeInTheDocument()
  })
})
