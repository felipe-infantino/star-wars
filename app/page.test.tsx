import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  it('renders the page heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1, name: 'Star Wars' })).toBeInTheDocument()
  })

  it('links to every resource route', () => {
    render(<Home />)

    const routes: [string, string][] = [
      ['People', '/people'],
      ['Planets', '/planets'],
      ['Films', '/films'],
      ['Species', '/species'],
      ['Vehicles', '/vehicles'],
      ['Starships', '/starships'],
    ]

    for (const [label, href] of routes) {
      expect(screen.getByRole('link', { name: new RegExp(label) })).toHaveAttribute('href', href)
    }
  })
})
