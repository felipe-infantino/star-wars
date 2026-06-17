import { describe, expect, it } from 'vitest'
import { parseListSearchParams } from './searchParams'

describe('parseListSearchParams', () => {
  it('defaults to page 1 with no search when params are empty', async () => {
    const result = await parseListSearchParams(Promise.resolve({}))
    expect(result).toEqual({ currentPage: 1, searchStr: undefined })
  })

  it('parses a numeric page and a string search term', async () => {
    const result = await parseListSearchParams(Promise.resolve({ page: '3', search: 'yoda' }))
    expect(result).toEqual({ currentPage: 3, searchStr: 'yoda' })
  })

  it('ignores a non-string search value (e.g. string[])', async () => {
    const result = await parseListSearchParams(Promise.resolve({ search: ['a', 'b'] }))
    expect(result.searchStr).toBeUndefined()
  })
})
