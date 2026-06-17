import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { planetItem } from './planetItem'
import { Planet } from './types'
import { BASE_URL } from '@/lib/swapi'

function makePlanet(overrides: Partial<Planet> = {}): Planet {
  return {
    name: 'Tatooine',
    climate: 'arid',
    terrain: 'desert',
    population: '200000',
    url: `${BASE_URL}/planets/1/`,
    diameter: '',
    surface_water: '',
    rotation_period: '',
    orbital_period: '',
    gravity: '',
    films: [],
    residents: [],
    created: '',
    edited: '',
    ...overrides,
  }
}

describe('planetItem', () => {
  it('renders the name, climate, terrain, and population', () => {
    render(<>{planetItem(makePlanet())}</>)

    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText('arid · desert · pop. 200000')).toBeInTheDocument()
  })

  it('links to the detail page using the id extracted from the SWAPI url', () => {
    render(<>{planetItem(makePlanet({ url: `${BASE_URL}/planets/1/` }))}</>)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/planets/1')
  })
})
