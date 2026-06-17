import BackButton from '@/components/BackButton'
import { BASE_URL, fetchSwapiByUrl } from '@/lib/swapi'
import { Film } from '../types'
import { People } from '@/app/people/types'
import { Planet } from '@/app/planets/types'
import { Starship } from '@/app/starships/types'
import { Vehicle } from '@/app/vehicles/types'
import { Species } from '@/app/species/types'
import { peopleItem } from '@/app/people/peopleItem'
import { planetItem } from '@/app/planets/planetItem'
import { starshipItem } from '@/app/starships/starshipItem'
import { vehicleItem } from '@/app/vehicles/vehicleItem'
import { speciesItem } from '@/app/species/speciesItem'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'

export default async function FilmPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const film = await fetchSwapiByUrl<Film>(`${BASE_URL}/films/${id}/`)

    const [characters, planets, starships, vehicles, species] = await Promise.all([
        Promise.all(film.characters.map(url => fetchSwapiByUrl<People>(url))),
        Promise.all(film.planets.map(url => fetchSwapiByUrl<Planet>(url))),
        Promise.all(film.starships.map(url => fetchSwapiByUrl<Starship>(url))),
        Promise.all(film.vehicles.map(url => fetchSwapiByUrl<Vehicle>(url))),
        Promise.all(film.species.map(url => fetchSwapiByUrl<Species>(url))),
    ])

    const props: [string, string][] = [
        ['Episode', String(film.episode_id)],
        ['Director', film.director],
        ['Producer', film.producer],
        ['Release date', film.release_date],
    ]

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{film.title}</h1>

            <p className="mt-4 whitespace-pre-line text-sm text-zinc-500 dark:text-zinc-400">
                {film.opening_crawl}
            </p>

            <PropsGrid fields={props} />

            <div className="mt-10 space-y-3">
                <ResourceAccordion label="Characters" items={characters} renderItem={peopleItem} />
                <ResourceAccordion label="Planets" items={planets} renderItem={planetItem} />
                <ResourceAccordion label="Starships" items={starships} renderItem={starshipItem} />
                <ResourceAccordion label="Vehicles" items={vehicles} renderItem={vehicleItem} />
                <ResourceAccordion label="Species" items={species} renderItem={speciesItem} />
            </div>
        </main>
    )
}
