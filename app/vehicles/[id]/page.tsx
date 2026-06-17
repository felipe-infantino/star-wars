'use client'

import { createResourceDetailPage, relation } from '@/components/ResourceDetailPage'
import { Vehicle } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { sanitizeProp } from '@/lib/sanitize'

export default createResourceDetailPage<Vehicle>({
    path: '/vehicles/',
    getTitle: (vehicle) => sanitizeProp(vehicle.name, 'Unknown vehicle'),
    getProps: (vehicle) => [
        ['Model', sanitizeProp(vehicle.model, 'unknown model')],
        ['Vehicle class', sanitizeProp(vehicle.vehicle_class, 'unknown class')],
        ['Manufacturer', sanitizeProp(vehicle.manufacturer, 'unknown manufacturer')],
        ['Cost', sanitizeProp(vehicle.cost_in_credits, 'unknown cost', ' credits')],
        ['Length', sanitizeProp(vehicle.length, 'unknown length', ' m')],
        ['Max atmosphering speed', sanitizeProp(vehicle.max_atmosphering_speed, 'unknown speed')],
        ['Crew', sanitizeProp(vehicle.crew, 'unknown crew')],
        ['Passengers', sanitizeProp(vehicle.passengers, 'unknown passengers')],
        ['Cargo capacity', sanitizeProp(vehicle.cargo_capacity, 'unknown cargo capacity')],
        ['Consumables', sanitizeProp(vehicle.consumables, 'unknown consumables')],
    ],
    relations: [
        relation({ label: 'Pilots', getUrls: (v: Vehicle) => v.pilots, renderItem: peopleItem }),
        relation({ label: 'Films', getUrls: (v: Vehicle) => v.films, renderItem: filmItem }),
    ],
})
