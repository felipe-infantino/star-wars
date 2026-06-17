'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { People } from '../types'
import { starshipItem } from '@/app/starships/starshipItem'
import { vehicleItem } from '@/app/vehicles/vehicleItem'
import { filmItem } from '@/app/films/filmItem'
import { speciesItem } from '@/app/species/speciesItem'

export default createResourceDetailPage<People>({
    path: '/people/',
    getTitle: (person) => person.name,
    getProps: (person) => [
        ['Gender', person.gender],
        ['Birth year', person.birth_year],
        ['Height', `${person.height} cm`],
        ['Mass', `${person.mass} kg`],
        ['Eye color', person.eye_color],
        ['Hair color', person.hair_color],
        ['Skin color', person.skin_color],
    ],
    relations: [
        { label: 'Starships', getUrls: (p) => p.starships, renderItem: starshipItem },
        { label: 'Vehicles', getUrls: (p) => p.vehicles, renderItem: vehicleItem },
        { label: 'Films', getUrls: (p) => p.films, renderItem: filmItem },
        { label: 'Species', getUrls: (p) => p.species, renderItem: speciesItem },
    ],
})
