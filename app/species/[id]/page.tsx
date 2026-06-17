'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Species } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { sanitizeProp } from '@/lib/sanitize'

export default createResourceDetailPage<Species>({
    path: '/species/',
    getTitle: (species) => sanitizeProp(species.name, 'Unknown species'),
    getProps: (species) => [
        ['Classification', sanitizeProp(species.classification, 'unknown classification')],
        ['Designation', sanitizeProp(species.designation, 'unknown designation')],
        ['Average height', sanitizeProp(species.average_height, 'unknown height', ' cm')],
        ['Average lifespan', sanitizeProp(species.average_lifespan, 'unknown lifespan', ' years')],
        ['Eye colors', sanitizeProp(species.eye_colors, 'unknown eye colors')],
        ['Hair colors', sanitizeProp(species.hair_colors, 'unknown hair colors')],
        ['Skin colors', sanitizeProp(species.skin_colors, 'unknown skin colors')],
        ['Language', sanitizeProp(species.language, 'unknown language')],
    ],
    relations: [
        { label: 'People', getUrls: (s) => s.people, renderItem: peopleItem },
        { label: 'Films', getUrls: (s) => s.films, renderItem: filmItem },
    ],
})
