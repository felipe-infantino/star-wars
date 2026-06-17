'use client'

import { createResourceListPage } from '@/components/ResourceListPage'
import { Film } from './types'
import { filmItem } from './filmItem'

export default createResourceListPage<Film>({
    title: 'Films',
    path: '/films/',
    renderItem: filmItem,
})
