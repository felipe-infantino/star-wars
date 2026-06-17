'use client'

import { createResourceDetailPage } from '@/components/ResourceDetailPage'
import { Film } from '../types'
import { peopleItem } from '@/app/people/peopleItem'
import { planetItem } from '@/app/planets/planetItem'
import { starshipItem } from '@/app/starships/starshipItem'
import { vehicleItem } from '@/app/vehicles/vehicleItem'
import { speciesItem } from '@/app/species/speciesItem'

export default createResourceDetailPage<Film>({
    path: '/films/',
    getTitle: (film) => film.title,
    getDescription: (film) => film.opening_crawl,
    getProps: (film) => [
        ['Episode', String(film.episode_id)],
        ['Director', film.director],
        ['Producer', film.producer],
        ['Release date', film.release_date],
    ],
    relations: [
        { label: 'Characters', getUrls: (f) => f.characters, renderItem: peopleItem },
        { label: 'Planets', getUrls: (f) => f.planets, renderItem: planetItem },
        { label: 'Starships', getUrls: (f) => f.starships, renderItem: starshipItem },
        { label: 'Vehicles', getUrls: (f) => f.vehicles, renderItem: vehicleItem },
        { label: 'Species', getUrls: (f) => f.species, renderItem: speciesItem },
    ],
})
