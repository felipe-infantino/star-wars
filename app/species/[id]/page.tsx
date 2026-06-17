import BackButton from '@/components/BackButton'
import { BASE_URL, fetchSwapiByUrl } from '@/lib/swapi'
import { Species } from '../types'
import { People } from '@/app/people/types'
import { Film } from '@/app/films/types'
import { peopleItem } from '@/app/people/peopleItem'
import { filmItem } from '@/app/films/filmItem'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'

export default async function SpeciesPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const species = await fetchSwapiByUrl<Species>(`${BASE_URL}/species/${id}/`)

    const [people, films] = await Promise.all([
        Promise.all(species.people.map(url => fetchSwapiByUrl<People>(url))),
        Promise.all(species.films.map(url => fetchSwapiByUrl<Film>(url))),
    ])

    const props: [string, string][] = [
        ['Classification', species.classification],
        ['Designation', species.designation],
        ['Average height', `${species.average_height} cm`],
        ['Average lifespan', `${species.average_lifespan} years`],
        ['Eye colors', species.eye_colors],
        ['Hair colors', species.hair_colors],
        ['Skin colors', species.skin_colors],
        ['Language', species.language],
    ]

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{species.name}</h1>

            <PropsGrid fields={props} />

            <div className="mt-10 space-y-3">
                <ResourceAccordion label="People" items={people} renderItem={peopleItem} />
                <ResourceAccordion label="Films" items={films} renderItem={filmItem} />
            </div>
        </main>
    )
}
