'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Vehicle } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'

export default createResourceDetailPage<Vehicle>({
    path: '/vehicles/',
    getTitle: (vehicle) => vehicle.name,
    getProps: (vehicle) => [
        ['Model', vehicle.model],
        ['Vehicle class', vehicle.vehicle_class],
        ['Manufacturer', vehicle.manufacturer],
        ['Cost', `${vehicle.cost_in_credits} credits`],
        ['Length', `${vehicle.length} m`],
        ['Max atmosphering speed', vehicle.max_atmosphering_speed],
        ['Crew', vehicle.crew],
        ['Passengers', vehicle.passengers],
        ['Cargo capacity', vehicle.cargo_capacity],
        ['Consumables', vehicle.consumables],
    ],
    relations: [
        { label: 'Pilots', getUrls: (v) => v.pilots, renderItem: peopleItem },
        { label: 'Films', getUrls: (v) => v.films, renderItem: filmItem },
    ],
})
