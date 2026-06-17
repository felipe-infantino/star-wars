import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { starshipItem } from './starshipItem'
import { Starship } from './types'
import { BASE_URL } from '@/lib/swapi'


function makeStarship(overrides: Partial<Starship> = {}): Starship {
  return {
    name: 'Millennium Falcon',
    starship_class: 'Light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    crew: '4',
    url: `${BASE_URL}/starships/10/`,
    passengers: '',
    pilots: [],
    hyperdrive_rating: '',
    cargo_capacity: '',
    consumables: '',
    max_atmosphering_speed: '',
    length: '',
    MGLT: '',
    films: [],
    model: '',
    cost_in_credits: '',
    created: '',
    edited: '',
    ...overrides,
  }
}

describe('starshipItem', () => {
  it('renders the name, class, manufacturer, and crew', () => {
    render(<>{starshipItem(makeStarship())}</>)

    expect(screen.getByText('Millennium Falcon')).toBeInTheDocument()
    expect(
      screen.getByText('Light freighter · Corellian Engineering Corporation · crew 4')
    ).toBeInTheDocument()
  })

  it('links to the detail page using the id extracted from the SWAPI url', () => {
    render(<>{starshipItem(makeStarship({ url: `${BASE_URL}/starships/10/` }))}</>)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/starships/10')
  })
})
