export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function parseListSearchParams(searchParams: SearchParams) {
    const { page = '1', search } = await searchParams
    const currentPage = Number(page)
    const searchStr = typeof search === 'string' ? search : undefined
    return { currentPage, searchStr }
}
