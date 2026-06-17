'use client'

import { createResourceDetailPage, relation } from '@/components/ResourceDetailPage'
import { Planet } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { sanitizeProp } from '@/lib/sanitize'

export default createResourceDetailPage<Planet>({
    path: '/planets/',
    getTitle: (planet) => sanitizeProp(planet.name, 'Unknown planet'),
    getProps: (planet) => [
        ['Climate', sanitizeProp(planet.climate, 'unknown climate')],
        ['Terrain', sanitizeProp(planet.terrain, 'unknown terrain')],
        ['Diameter', sanitizeProp(planet.diameter, 'unknown diameter', ' km')],
        ['Gravity', sanitizeProp(planet.gravity, 'unknown gravity')],
        ['Surface water', sanitizeProp(planet.surface_water, 'unknown surface water', '%')],
        ['Population', sanitizeProp(planet.population, 'unknown population')],
        ['Orbital period', sanitizeProp(planet.orbital_period, 'unknown orbital period', ' days')],
        ['Rotation period', sanitizeProp(planet.rotation_period, 'unknown rotation period', ' hours')],
    ],
    relations: [
        relation({ label: 'Residents', getUrls: (p: Planet) => p.residents, renderItem: peopleItem }),
        relation({ label: 'Films', getUrls: (p: Planet) => p.films, renderItem: filmItem }),
    ],
})
