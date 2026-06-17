'use client'

import { useParams } from 'next/navigation'
import BackButton from '@/components/BackButton'
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

export function createResourceDetailPage<T>({
    path,
    getTitle,
    getProps,
    getDescription,
    relations,
}: Config<T>) {
    return function ResourceDetailPage() {
        const { id } = useParams<{ id: string }>()
        const {
            data: resource,
            isLoading,
            isError,
        } = useSwapiResource<T>(`${BASE_URL}${path}${id}/`)

        // Fan out all relation URLs in one batch, then slice results back per relation.
        const relationUrls = resource ? relations.map((rel) => rel.getUrls(resource)) : []
        const flatUrls = relationUrls.flat()
        const { items, isLoading: relationsLoading } = useSwapiResources<unknown>(flatUrls)

        if (isLoading) {
            return (
                <main className="mx-auto w-full max-w-3xl px-6 py-12">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
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

        let cursor = 0
        const description = getDescription?.(resource)

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
                    {relations.map((rel, i) => {
                        const count = relationUrls[i].length
                        const slice = items.slice(cursor, cursor + count)
                        cursor += count
                        return (
                            <ResourceAccordion
                                key={rel.label}
                                label={rel.label}
                                items={relationsLoading ? [] : slice}
                                renderItem={rel.renderItem as (item: unknown) => React.ReactNode}
                            />
                        )
                    })}
                </div>
            </main>
        )
    }
}
