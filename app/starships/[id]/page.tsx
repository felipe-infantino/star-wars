'use client'

import { createResourceDetailPage, relation } from '@/components/ResourceDetailPage'
import { Starship } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { sanitizeProp } from '@/lib/sanitize'

export default createResourceDetailPage<Starship>({
    path: '/starships/',
    getTitle: (starship) => sanitizeProp(starship.name, 'Unknown starship'),
    getProps: (starship) => [
        ['Model', sanitizeProp(starship.model, 'unknown model')],
        ['Starship class', sanitizeProp(starship.starship_class, 'unknown class')],
        ['Manufacturer', sanitizeProp(starship.manufacturer, 'unknown manufacturer')],
        ['Cost', sanitizeProp(starship.cost_in_credits, 'unknown cost', ' credits')],
        ['Length', sanitizeProp(starship.length, 'unknown length', ' m')],
        ['Max atmosphering speed', sanitizeProp(starship.max_atmosphering_speed, 'unknown speed')],
        ['Crew', sanitizeProp(starship.crew, 'unknown crew')],
        ['Passengers', sanitizeProp(starship.passengers, 'unknown passengers')],
        ['Cargo capacity', sanitizeProp(starship.cargo_capacity, 'unknown cargo capacity')],
        ['Consumables', sanitizeProp(starship.consumables, 'unknown consumables')],
        ['Hyperdrive rating', sanitizeProp(starship.hyperdrive_rating, 'unknown hyperdrive rating')],
        ['MGLT', sanitizeProp(starship.MGLT, 'unknown MGLT')],
    ],
    relations: [
        relation({ label: 'Pilots', getUrls: (s: Starship) => s.pilots, renderItem: peopleItem }),
        relation({ label: 'Films', getUrls: (s: Starship) => s.films, renderItem: filmItem }),
    ],
})
