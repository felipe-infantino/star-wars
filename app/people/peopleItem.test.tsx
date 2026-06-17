import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { peopleItem } from './peopleItem'
import { People } from './types'
import { BASE_URL } from '@/lib/swapi'

function makePerson(overrides: Partial<People> = {}): People {
  return {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    height: '172',
    mass: '77',
    url: `${BASE_URL}/people/1/`,
    starships: [],
    vehicles: [],
    films: [],
    species: [],
    homeworld: '',
    skin_color: '',
    hair_color: '',
    eye_color: '',
    created: '',
    edited: '',
    ...overrides,
  }
}

describe('peopleItem', () => {
  it('renders the name and key stats', () => {
    render(<>{peopleItem(makePerson())}</>)

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('male · born 19BBY · 172 cm · 77 kg')).toBeInTheDocument()
  })

  it('links to the detail page using the id extracted from the SWAPI url', () => {
    render(<>{peopleItem(makePerson({ url: `${BASE_URL}/people/1/` }))}</>)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/people/1')
  })
})
