import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { vehicleItem } from './vehicleItem'
import { Vehicle } from './types'
import { BASE_URL } from '@/lib/swapi'

function makeVehicle(overrides: Partial<Vehicle> = {}): Vehicle {
  return {
    name: 'Sand Crawler',
    vehicle_class: 'wheeled',
    manufacturer: 'Corellia Mining Corporation',
    crew: '46',
    url: `${BASE_URL}/vehicles/4/`,
    passengers: '',
    pilots: [],
    cargo_capacity: '',
    consumables: '',
    max_atmosphering_speed: '',
    length: '',
    films: [],
    model: '',
    cost_in_credits: '',
    created: '',
    edited: '',
    ...overrides,
  }
}

describe('vehicleItem', () => {
  it('renders the name, class, manufacturer, and crew', () => {
    render(<>{vehicleItem(makeVehicle())}</>)

    expect(screen.getByText('Sand Crawler')).toBeInTheDocument()
    expect(
      screen.getByText('wheeled · Corellia Mining Corporation · crew 46')
    ).toBeInTheDocument()
  })

  it('links to the detail page using the id extracted from the SWAPI url', () => {
    render(<>{vehicleItem(makeVehicle({ url: `${BASE_URL}/vehicles/4/` }))}</>)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/vehicles/4')
  })
})
