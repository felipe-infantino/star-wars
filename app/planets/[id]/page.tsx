'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Planet } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'

export default createResourceDetailPage<Planet>({
    path: '/planets/',
    getTitle: (planet) => planet.name,
    getProps: (planet) => [
        ['Climate', planet.climate],
        ['Terrain', planet.terrain],
        ['Diameter', `${planet.diameter} km`],
        ['Gravity', planet.gravity],
        ['Surface water', `${planet.surface_water}%`],
        ['Population', planet.population],
        ['Orbital period', `${planet.orbital_period} days`],
        ['Rotation period', `${planet.rotation_period} hours`],
    ],
    relations: [
        { label: 'Residents', getUrls: (p) => p.residents, renderItem: peopleItem },
        { label: 'Films', getUrls: (p) => p.films, renderItem: filmItem },
    ],
})
