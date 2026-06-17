import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Accordion } from './accordion'

describe('Accordion', () => {
  it('renders the label, count, and children', () => {
    render(
      <Accordion label="Films" count={3}>
        <p>content</p>
      </Accordion>
    )

    expect(screen.getByText('Films')).toBeInTheDocument()
    expect(screen.getByText('(3)')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('is collapsed by default', () => {
    render(
      <Accordion label="Films" count={1}>
        <p>content</p>
      </Accordion>
    )

    const details = screen.getByText('content').closest('details')
    expect(details).not.toHaveAttribute('open')
  })
})
