import { afterEach, describe, expect, it, vi } from 'vitest'
import { BASE_URL, fetchSwapi, fetchSwapiByUrl } from './swapi'

describe('fetchSwapi', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('builds the request URL with page and search params', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: 1, next: null, previous: null, results: [] }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await fetchSwapi('/people', 2, 'luke')

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/people?page=2&search=luke`
    )
  })

  it('omits the search param when none is given', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: 1, next: null, previous: null, results: [] }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await fetchSwapi('/people', 1)

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/people?page=1`)
  })

  it('returns the parsed JSON body on success', async () => {
    const body = { count: 1, next: null, previous: null, results: [{ name: 'Luke' }] }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(body) })
    )

    const result = await fetchSwapi('/people', 1)

    expect(result).toEqual(body)
  })

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))

    await expect(fetchSwapi('/people', 1)).rejects.toThrow('SWAPI error: 404')
  })
})

describe('fetchSwapiByUrl', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches the given url and returns the parsed JSON body', async () => {
    const body = { name: 'Luke' }
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(body) })
    vi.stubGlobal('fetch', fetchMock)

    const result = await fetchSwapiByUrl(`${BASE_URL}/people/1/`)

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/people/1/`)
    expect(result).toEqual(body)
  })

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))

    await expect(fetchSwapiByUrl(`${BASE_URL}/people/1/`)).rejects.toThrow(
      'SWAPI error: 500'
    )
  })
})
