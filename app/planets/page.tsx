import { createResourceListPage } from '@/components/ResourceListPage'
import { Planet } from './types'
import { planetItem } from './planetItem'

export default createResourceListPage<Planet>({
    title: 'Planets',
    path: '/planets/',
    renderItem: planetItem,
})
