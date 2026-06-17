'use client'

import { createResourceDetailPage, relation } from '@/components/ResourceDetailPage'
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
        relation({ label: 'Starships', getUrls: (p: People) => p.starships, renderItem: starshipItem }),
        relation({ label: 'Vehicles', getUrls: (p: People) => p.vehicles, renderItem: vehicleItem }),
        relation({ label: 'Films', getUrls: (p: People) => p.films, renderItem: filmItem }),
        relation({ label: 'Species', getUrls: (p: People) => p.species, renderItem: speciesItem }),
    ],
})
