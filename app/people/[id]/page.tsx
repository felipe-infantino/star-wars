import BackButton from '@/components/BackButton'
import { BASE_URL, fetchSwapiByUrl } from '@/lib/swapi'
import { People } from '../types'
import { Starship } from '@/app/starships/types'
import { Vehicle } from '@/app/vehicles/types'
import { Film } from '@/app/films/types'
import { Species } from '@/app/species/types'
import { starshipItem } from '@/app/starships/starshipItem'
import { vehicleItem } from '@/app/vehicles/vehicleItem'
import { filmItem } from '@/app/films/filmItem'
import { speciesItem } from '@/app/species/speciesItem'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'


export default async function PersonPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const person = await fetchSwapiByUrl<People>(`${BASE_URL}/people/${id}/`)

    const [starships, vehicles, films, species] = await Promise.all([
        Promise.all(person.starships.map(url => fetchSwapiByUrl<Starship>(url))),
        Promise.all(person.vehicles.map(url => fetchSwapiByUrl<Vehicle>(url))),
        Promise.all(person.films.map(url => fetchSwapiByUrl<Film>(url))),
        Promise.all(person.species.map(url => fetchSwapiByUrl<Species>(url))),
    ])

    const props: [string, string][] = [
        ['Gender', person.gender],
        ['Birth year', person.birth_year],
        ['Height', `${person.height} cm`],
        ['Mass', `${person.mass} kg`],
        ['Eye color', person.eye_color],
        ['Hair color', person.hair_color],
        ['Skin color', person.skin_color],
    ]

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{person.name}</h1>

            <PropsGrid fields={props} />

            <div className="mt-10 space-y-3">
                <ResourceAccordion label="Starships" items={starships} renderItem={starshipItem} />
                <ResourceAccordion label="Vehicles" items={vehicles} renderItem={vehicleItem} />
                <ResourceAccordion label="Films" items={films} renderItem={filmItem} />
                <ResourceAccordion label="Species" items={species} renderItem={speciesItem} />
            </div>
        </main>
    )
}
