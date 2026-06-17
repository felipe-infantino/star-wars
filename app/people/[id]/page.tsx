'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { People } from '../types'
import { starshipItem } from '@/app/starships/starshipItem'
import { vehicleItem } from '@/app/vehicles/vehicleItem'
import { filmItem } from '@/app/films/filmItem'
import { speciesItem } from '@/app/species/speciesItem'
import { sanitizeProp } from '@/lib/sanitize'

export default createResourceDetailPage<People>({
    path: '/people/',
    getTitle: (person) => sanitizeProp(person.name, 'Unknown person'),
    getProps: (person) => [
        ['Gender', sanitizeProp(person.gender, 'unknown gender')],
        ['Birth year', sanitizeProp(person.birth_year, 'unknown birth year')],
        ['Height', sanitizeProp(person.height, 'unknown height', ' cm')],
        ['Mass', sanitizeProp(person.mass, 'unknown mass', ' kg')],
        ['Eye color', sanitizeProp(person.eye_color, 'unknown eye color')],
        ['Hair color', sanitizeProp(person.hair_color, 'unknown hair color')],
        ['Skin color', sanitizeProp(person.skin_color, 'unknown skin color')],
    ],
    relations: [
        { label: 'Starships', getUrls: (p) => p.starships, renderItem: starshipItem },
        { label: 'Vehicles', getUrls: (p) => p.vehicles, renderItem: vehicleItem },
        { label: 'Films', getUrls: (p) => p.films, renderItem: filmItem },
        { label: 'Species', getUrls: (p) => p.species, renderItem: speciesItem },
    ],
})
