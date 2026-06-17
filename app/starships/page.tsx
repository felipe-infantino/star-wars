'use client'

import { createResourceListPage } from '@/components/ResourceListPage'
import { Starship } from './types'
import { starshipItem } from './starshipItem'

export default createResourceListPage<Starship>({
    title: 'Starships',
    path: '/starships/',
    renderItem: starshipItem,
})
