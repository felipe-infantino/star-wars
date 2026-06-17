'use client'

import { createResourceListPage } from '@/components/ResourceListPage'
import { Vehicle } from './types'
import { vehicleItem } from './vehicleItem'

export default createResourceListPage<Vehicle>({
    title: 'Vehicles',
    path: '/vehicles/',
    renderItem: vehicleItem,
})
