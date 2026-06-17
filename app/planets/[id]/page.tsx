import BackButton from '@/components/BackButton'
import { BASE_URL, fetchSwapiByUrl } from '@/lib/swapi'
import { Planet } from '../types'
import { People } from '@/app/people/types'
import { Film } from '@/app/films/types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'


export default async function PlanetPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const planet = await fetchSwapiByUrl<Planet>(`${BASE_URL}/planets/${id}/`)

    const [residents, films] = await Promise.all([
        Promise.all(planet.residents.map(url => fetchSwapiByUrl<People>(url))),
        Promise.all(planet.films.map(url => fetchSwapiByUrl<Film>(url))),
    ])

    const props: [string, string][] = [
        ['Climate', planet.climate],
        ['Terrain', planet.terrain],
        ['Diameter', `${planet.diameter} km`],
        ['Gravity', planet.gravity],
        ['Surface water', `${planet.surface_water}%`],
        ['Population', planet.population],
        ['Orbital period', `${planet.orbital_period} days`],
        ['Rotation period', `${planet.rotation_period} hours`],
    ]

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{planet.name}</h1>

            <PropsGrid fields={props} />

            <div className="mt-10 space-y-3">
                <ResourceAccordion label="Residents" items={residents} renderItem={peopleItem} />
                <ResourceAccordion label="Films" items={films} renderItem={filmItem} />
            </div>
        </main>
    )
}
