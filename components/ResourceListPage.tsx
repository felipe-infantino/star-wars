'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PaginatedList from '@/components/PaginatedList'
import SearchBar from '@/components/SearchBar'
import Loading from '@/components/Loading'
import { useSwapiList } from '@/hooks/useSwapi'

type Config<T> = {
    title: string
    path: string
    renderItem: (item: T) => React.ReactNode
}

export const createResourceListPage = <T,>({ title, path, renderItem }: Config<T>) => () => {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page') ?? '1')
    const searchStr = searchParams.get('search') ?? undefined

    const { data, isLoading, isError } = useSwapiList<T>(path, currentPage, searchStr)
    return (
        <Suspense>
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <h1 className="mb-8 text-3xl font-semibold tracking-tight">{title}</h1>
                <SearchBar defaultValue={searchStr} />
                {isLoading && <Loading />}
                {isError && (
                    <p className="text-sm text-red-600 dark:text-red-400">Failed to load {title.toLowerCase()}.</p>
                )}
                {data && (
                    <PaginatedList
                        data={data}
                        currentPage={currentPage}
                        search={searchStr}
                        renderItem={renderItem}
                    />
                )}
            </main>
        </Suspense>
    )
}

