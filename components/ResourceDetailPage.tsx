'use client'

import { useParams } from 'next/navigation'
import BackButton from '@/components/BackButton'
import Loading from '@/components/Loading'
import { PropsGrid } from '@/components/PropsGrid'
import { ResourceAccordion } from '@/components/ResourceAccordion'
import { useSwapiResource, useSwapiResources } from '@/hooks/useSwapi'
import { BASE_URL } from '@/lib/swapi'
import { ResourceUrl } from '@/app/types'

type Relation<T> = {
    label: string
    getUrls: (resource: T) => ResourceUrl[]
    renderItem: (item: never) => React.ReactNode
}

type Config<T> = {
    path: string
    getTitle: (resource: T) => string
    getProps: (resource: T) => [string, string][]
    getDescription?: (resource: T) => string
    relations: Relation<T>[]
}

// Relation resources are fetched in one flat batch (e.g. a Person's Starships +
// Vehicles + Films combined). Split that flat list back into one contiguous group
// per relation, using each relation's url count as its slice length.
function groupByCounts<T>(items: T[], counts: number[]): T[][] {
    let offset = 0
    return counts.map((count) => items.slice(offset, (offset += count)))
}

export const createResourceDetailPage = <T,>({ path, getTitle, getProps, getDescription, relations }: Config<T>) => () => {
    const { id } = useParams<{ id: string }>()
    const { data: resource, isLoading, isError } = useSwapiResource<T>(`${BASE_URL}${path}${id}/`)

    // Fan out all relation URLs in one batch, then slice results back per relation.
    const relationUrls = resource ? relations.map((rel) => rel.getUrls(resource)) : []
    const { items, isLoading: relationsLoading } = useSwapiResources(relationUrls.flat())

    if (isLoading) {
        return (
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <Loading />
            </main>
        )
    }

    if (isError || !resource) {
        return (
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <BackButton />
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                    Could not load this resource. It may not exist.
                </p>
            </main>
        )
    }
    const description = getDescription?.(resource)
    const relationItems = relationsLoading
        ? relations.map(() => [])
        : groupByCounts(items, relationUrls.map((urls) => urls.length))

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BackButton />

            <h1 className="mt-4 text-4xl font-bold tracking-tight">{getTitle(resource)}</h1>

            {description && (
                <p className="mt-4 whitespace-pre-line text-sm text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            )}

            <PropsGrid fields={getProps(resource)} />

            <div className="mt-10 space-y-3">
                {relations.map((rel, i) => (
                    <ResourceAccordion
                        key={rel.label}
                        label={rel.label}
                        items={relationItems[i]}
                        renderItem={rel.renderItem as (item: unknown) => React.ReactNode}
                    />
                ))}
            </div>
        </main>
    )
}
