'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Starship } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'

export default createResourceDetailPage<Starship>({
    path: '/starships/',
    getTitle: (starship) => starship.name,
    getProps: (starship) => [
        ['Model', starship.model],
        ['Starship class', starship.starship_class],
        ['Manufacturer', starship.manufacturer],
        ['Cost', `${starship.cost_in_credits} credits`],
        ['Length', `${starship.length} m`],
        ['Max atmosphering speed', starship.max_atmosphering_speed],
        ['Crew', starship.crew],
        ['Passengers', starship.passengers],
        ['Cargo capacity', starship.cargo_capacity],
        ['Consumables', starship.consumables],
        ['Hyperdrive rating', starship.hyperdrive_rating],
        ['MGLT', starship.MGLT],
    ],
    relations: [
        { label: 'Pilots', getUrls: (s) => s.pilots, renderItem: peopleItem },
        { label: 'Films', getUrls: (s) => s.films, renderItem: filmItem },
    ],
})
