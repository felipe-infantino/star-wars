import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders a link for every resource', () => {
    render(<Navbar />)

    for (const label of ['Home', 'People', 'Planets', 'Films', 'Species', 'Starships', 'Vehicles']) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    }
  })

  it('starts with the mobile menu closed', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('toggles the mobile menu open and closed on click', async () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })

    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('closes the mobile menu when a link is clicked', async () => {
    render(<Navbar />)

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    const mobileLinks = screen.getAllByRole('link', { name: 'People' })
    await userEvent.click(mobileLinks[mobileLinks.length - 1])

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })
})
