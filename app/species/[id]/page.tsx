'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Species } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'

export default createResourceDetailPage<Species>({
    path: '/species/',
    getTitle: (species) => species.name,
    getProps: (species) => [
        ['Classification', species.classification],
        ['Designation', species.designation],
        ['Average height', `${species.average_height} cm`],
        ['Average lifespan', `${species.average_lifespan} years`],
        ['Eye colors', species.eye_colors],
        ['Hair colors', species.hair_colors],
        ['Skin colors', species.skin_colors],
        ['Language', species.language],
    ],
    relations: [
        { label: 'People', getUrls: (s) => s.people, renderItem: peopleItem },
        { label: 'Films', getUrls: (s) => s.films, renderItem: filmItem },
    ],
})
