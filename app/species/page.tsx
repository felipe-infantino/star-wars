import { createResourceListPage } from '@/components/ResourceListPage'
import { Species } from './types'
import { speciesItem } from './speciesItem'

export default createResourceListPage<Species>({
    title: 'Species',
    path: '/species/',
    renderItem: speciesItem,
})
