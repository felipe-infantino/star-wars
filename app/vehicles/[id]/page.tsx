import BackButton from '@/components/BackButton'
import { BASE_URL, fetchSwapiByUrl } from '@/lib/swapi'
import { Vehicle } from '../types'
import { People } from '@/app/people/types'
import { Film } from '@/app/films/types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'


export default async function VehiclePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const vehicle = await fetchSwapiByUrl<Vehicle>(`${BASE_URL}/vehicles/${id}/`)

    const [pilots, films] = await Promise.all([
        Promise.all(vehicle.pilots.map(url => fetchSwapiByUrl<People>(url))),
        Promise.all(vehicle.films.map(url => fetchSwapiByUrl<Film>(url))),
    ])

    const props: [string, string][] = [
        ['Model', vehicle.model],
        ['Vehicle class', vehicle.vehicle_class],
        ['Manufacturer', vehicle.manufacturer],
        ['Cost', `${vehicle.cost_in_credits} credits`],
        ['Length', `${vehicle.length} m`],
        ['Max atmosphering speed', vehicle.max_atmosphering_speed],
        ['Crew', vehicle.crew],
        ['Passengers', vehicle.passengers],
        ['Cargo capacity', vehicle.cargo_capacity],
        ['Consumables', vehicle.consumables],
    ]

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{vehicle.name}</h1>

            <PropsGrid fields={props} />

            <div className="mt-10 space-y-3">
                <ResourceAccordion label="Pilots" items={pilots} renderItem={peopleItem} />
                <ResourceAccordion label="Films" items={films} renderItem={filmItem} />
            </div>
        </main>
    )
}
