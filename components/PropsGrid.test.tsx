import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PropsGrid } from './PropsGrid'

describe('PropsGrid', () => {
  it('renders a label/value pair for each field', () => {
    render(
      <PropsGrid
        fields={[
          ['Height', '172'],
          ['Mass', '77'],
        ]}
      />
    )

    expect(screen.getByText('Height')).toBeInTheDocument()
    expect(screen.getByText('172')).toBeInTheDocument()
    expect(screen.getByText('Mass')).toBeInTheDocument()
    expect(screen.getByText('77')).toBeInTheDocument()
  })

  it('renders nothing when fields is empty', () => {
    const { container } = render(<PropsGrid fields={[]} />)
    expect(container.querySelector('dl')?.children.length).toBe(0)
  })
})
