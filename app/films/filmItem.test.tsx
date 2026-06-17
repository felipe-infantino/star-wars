import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { filmItem } from './filmItem'
import { Film } from './types'
import { BASE_URL } from '@/lib/swapi'

function makeFilm(overrides: Partial<Film> = {}): Film {
  return {
    title: 'A New Hope',
    episode_id: 4,
    director: 'George Lucas',
    release_date: '1977-05-25',
    url: `${BASE_URL}/films/1/`,
    starships: [],
    planets: [],
    vehicles: [],
    characters: [],
    species: [],
    producer: '',
    opening_crawl: '',
    created: '',
    edited: '',
    ...overrides,
  }
}

describe('filmItem', () => {
  it('renders the episode number, title, director, and release date', () => {
    render(<>{filmItem(makeFilm())}</>)

    expect(screen.getByText('Episode 4 — A New Hope')).toBeInTheDocument()
    expect(screen.getByText('Directed by George Lucas · 1977-05-25')).toBeInTheDocument()
  })

  it('links to the detail page using the id extracted from the SWAPI url', () => {
    render(<>{filmItem(makeFilm({ url: `${BASE_URL}/films/1/` }))}</>)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/films/1')
  })
})
