import { createResourceListPage } from '@/components/ResourceListPage'
import { People } from './types'
import { peopleItem } from './peopleItem'

export default createResourceListPage<People>({
    title: 'People',
    path: '/people/',
    renderItem: peopleItem,
})
