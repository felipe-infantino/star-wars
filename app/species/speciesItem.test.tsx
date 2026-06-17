import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { speciesItem } from './speciesItem'
import { Species } from './types'
import { BASE_URL } from '@/lib/swapi'

function makeSpecies(overrides: Partial<Species> = {}): Species {
  return {
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
    language: 'Galactic Basic',
    url: `${BASE_URL}/species/1/`,
    people: [],
    eye_colors: '',
    skin_colors: '',
    hair_colors: '',
    homeworld: '',
    films: [],
    average_lifespan: '',
    average_height: '',
    created: '',
    edited: '',
    ...overrides,
  }
}

describe('speciesItem', () => {
  it('renders the name, classification, designation, and language', () => {
    render(<>{speciesItem(makeSpecies())}</>)

    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('mammal · sentient · lang. Galactic Basic')).toBeInTheDocument()
  })

  it('links to the detail page using the id extracted from the SWAPI url', () => {
    render(<>{speciesItem(makeSpecies({ url: `${BASE_URL}/species/1/` }))}</>)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/species/1')
  })
})
