import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ResourceAccordion } from './ResourceAccordion'

describe('ResourceAccordion', () => {
  it('renders "None" when items is empty', () => {
    render(<ResourceAccordion label="Films" items={[]} renderItem={(item) => item} />)
    expect(screen.getByText('None')).toBeInTheDocument()
  })

  it('renders each item via renderItem when items is non-empty', () => {
    render(
      <ResourceAccordion
        label="Films"
        items={['A New Hope', 'Empire Strikes Back']}
        renderItem={(item) => <span>{item}</span>}
      />
    )

    expect(screen.queryByText('None')).not.toBeInTheDocument()
    expect(screen.getByText('A New Hope')).toBeInTheDocument()
    expect(screen.getByText('Empire Strikes Back')).toBeInTheDocument()
  })

  it('passes the item count through to the Accordion label', () => {
    render(
      <ResourceAccordion label="Films" items={['A New Hope']} renderItem={(item) => item} />
    )
    expect(screen.getByText('(1)')).toBeInTheDocument()
  })
})
