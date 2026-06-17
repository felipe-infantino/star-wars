import PaginatedList from '@/components/PaginatedList'
import SearchBar from '@/components/SearchBar'
import { fetchSwapi } from '@/lib/swapi'
import { parseListSearchParams, SearchParams } from '@/lib/searchParams'

type Config<T> = {
    title: string
    path: string
    renderItem: (item: T) => React.ReactNode
}

export function createResourceListPage<T>({ title, path, renderItem }: Config<T>) {
    return async function ResourceListPage({ searchParams }: { searchParams: SearchParams }) {
        const { currentPage, searchStr } = await parseListSearchParams(searchParams)
        const data = await fetchSwapi<T>(path, currentPage, searchStr)

        return (
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <h1 className="mb-8 text-3xl font-semibold tracking-tight">{title}</h1>
                <SearchBar defaultValue={searchStr} />
                <PaginatedList
                    data={data}
                    currentPage={currentPage}
                    search={searchStr}
                    renderItem={renderItem}
                />
            </main>
        )
    }
}
