'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Film } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { planetItem } from '@/app/planets/planetItem'
import { starshipItem } from '@/app/starships/starshipItem'
import { vehicleItem } from '@/app/vehicles/vehicleItem'
import { speciesItem } from '@/app/species/speciesItem'
import { sanitizeProp } from '@/lib/sanitize'

export default createResourceDetailPage<Film>({
    path: '/films/',
    getTitle: (film) => sanitizeProp(film.title, 'Unknown film'),
    getDescription: (film) => sanitizeProp(film.opening_crawl, ''),
    getProps: (film) => [
        ['Episode', sanitizeProp(film.episode_id, 'unknown episode')],
        ['Director', sanitizeProp(film.director, 'unknown director')],
        ['Producer', sanitizeProp(film.producer, 'unknown producer')],
        ['Release date', sanitizeProp(film.release_date, 'unknown release date')],
    ],
    relations: [
        { label: 'Characters', getUrls: (f) => f.characters, renderItem: peopleItem },
        { label: 'Planets', getUrls: (f) => f.planets, renderItem: planetItem },
        { label: 'Starships', getUrls: (f) => f.starships, renderItem: starshipItem },
        { label: 'Vehicles', getUrls: (f) => f.vehicles, renderItem: vehicleItem },
        { label: 'Species', getUrls: (f) => f.species, renderItem: speciesItem },
    ],
})
