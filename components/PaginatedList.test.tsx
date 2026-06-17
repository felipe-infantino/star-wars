import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PaginatedList from './PaginatedList'
import { BASE_URL, PaginatedResponse } from '@/lib/swapi'

type Item = { name: string }

function makeData(overrides: Partial<PaginatedResponse<Item>> = {}): PaginatedResponse<Item> {
  return {
    count: 25,
    next: null,
    previous: null,
    results: [{ name: 'Luke' }, { name: 'Leia' }],
    ...overrides,
  }
}

describe('PaginatedList', () => {
  it('renders the result count and current/total page', () => {
    render(
      <PaginatedList data={makeData()} currentPage={2} renderItem={(item) => item.name} />
    )
    expect(screen.getByText('25 results — page 2 of 3')).toBeInTheDocument()
  })

  it('renders each item via renderItem', () => {
    render(
      <PaginatedList data={makeData()} currentPage={1} renderItem={(item) => item.name} />
    )
    expect(screen.getByText('Luke')).toBeInTheDocument()
    expect(screen.getByText('Leia')).toBeInTheDocument()
  })

  it('hides the Previous link on the first page', () => {
    render(<PaginatedList data={makeData()} currentPage={1} renderItem={(item) => item.name} />)
    expect(screen.queryByText('← Previous')).not.toBeInTheDocument()
  })

  it('shows the Previous link with the correct href after the first page', () => {
    render(<PaginatedList data={makeData()} currentPage={2} renderItem={(item) => item.name} />)
    expect(screen.getByText('← Previous')).toHaveAttribute('href', '?page=1')
  })

  it('hides the Next link when there is no next page', () => {
    render(
      <PaginatedList data={makeData({ next: null })} currentPage={1} renderItem={(item) => item.name} />
    )
    expect(screen.queryByText('Next →')).not.toBeInTheDocument()
  })

  it('shows the Next link with the correct href, preserving search', () => {
    render(
      <PaginatedList
        data={makeData({ next: `${BASE_URL}/people?page=2` })}
        currentPage={1}
        search="luke"
        renderItem={(item) => item.name}
      />
    )
    expect(screen.getByText('Next →')).toHaveAttribute('href', '?page=2&search=luke')
  })
})
