export const BASE_URL = 'https://swapi.py4e.com/api'

const SWAPI_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (compatible; StarWarsBrowser/1.0; +https://swapi.py4e.com)',
  Accept: 'application/json',
}

export type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function fetchSwapiByUrl<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: SWAPI_HEADERS })
  if (!res.ok) throw new Error(`SWAPI error: ${res.status}`)
  return res.json() as Promise<T>
}

export async function fetchSwapi<T>(
  path: string,
  page = 1,
  search?: string
): Promise<PaginatedResponse<T>> {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('page', String(page))
  if (search) url.searchParams.set('search', search)
  const res = await fetch(url.toString(), { headers: SWAPI_HEADERS })
  if (!res.ok) throw new Error(`SWAPI error: ${res.status}`)
  return res.json() as Promise<PaginatedResponse<T>>
}
