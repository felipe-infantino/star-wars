import BackButton from '@/components/BackButton'
import { BASE_URL, fetchSwapiByUrl } from '@/lib/swapi'
import { Starship } from '../types'
import { People } from '@/app/people/types'
import { Film } from '@/app/films/types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'

export default async function StarshipPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const starship = await fetchSwapiByUrl<Starship>(`${BASE_URL}/starships/${id}/`)

    const [pilots, films] = await Promise.all([
        Promise.all(starship.pilots.map(url => fetchSwapiByUrl<People>(url))),
        Promise.all(starship.films.map(url => fetchSwapiByUrl<Film>(url))),
    ])

    const props: [string, string][] = [
        ['Model', starship.model],
        ['Starship class', starship.starship_class],
        ['Manufacturer', starship.manufacturer],
        ['Cost', `${starship.cost_in_credits} credits`],
        ['Length', `${starship.length} m`],
        ['Max atmosphering speed', starship.max_atmosphering_speed],
        ['Crew', starship.crew],
        ['Passengers', starship.passengers],
        ['Cargo capacity', starship.cargo_capacity],
        ['Consumables', starship.consumables],
        ['Hyperdrive rating', starship.hyperdrive_rating],
        ['MGLT', starship.MGLT],
    ]

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{starship.name}</h1>

            <PropsGrid fields={props} />

            <div className="mt-10 space-y-3">
                <ResourceAccordion label="Pilots" items={pilots} renderItem={peopleItem} />
                <ResourceAccordion label="Films" items={films} renderItem={filmItem} />
            </div>
        </main>
    )
}
