'use client'

import { createResourceDetailPage, relation } from '@/components/ResourceDetailPage'
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
        relation({ label: 'Characters', getUrls: (f: Film) => f.characters, renderItem: peopleItem }),
        relation({ label: 'Planets', getUrls: (f: Film) => f.planets, renderItem: planetItem }),
        relation({ label: 'Starships', getUrls: (f: Film) => f.starships, renderItem: starshipItem }),
        relation({ label: 'Vehicles', getUrls: (f: Film) => f.vehicles, renderItem: vehicleItem }),
        relation({ label: 'Species', getUrls: (f: Film) => f.species, renderItem: speciesItem }),
    ],
})
