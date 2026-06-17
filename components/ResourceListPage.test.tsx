import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { createResourceListPage } from './ResourceListPage'
import { renderWithClient } from '@/test/renderWithClient'
import { fetchSwapi } from '@/lib/swapi'

const searchParams = { current: new URLSearchParams() }

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/widgets',
  useSearchParams: () => searchParams.current,
}))

vi.mock('@/lib/swapi', () => ({
  fetchSwapi: vi.fn(),
}))

type MockResource = { name: string }

describe('createResourceListPage', () => {
  it('fetches the configured path with the page/search from the URL and renders the result', async () => {
    searchParams.current = new URLSearchParams('page=2&search=falcon')
    vi.mocked(fetchSwapi).mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'Millennium Falcon' }],
    })

    const MockResourcePage = createResourceListPage<MockResource>({
      title: 'MockResource',
      path: '/mock-resources/',
      renderItem: (resource) => resource.name,
    })

    renderWithClient(<MockResourcePage />)

    expect(screen.getByRole('heading', { level: 1, name: 'MockResource' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search…')).toHaveValue('falcon')
    expect(await screen.findByText('Millennium Falcon')).toBeInTheDocument()
    expect(fetchSwapi).toHaveBeenCalledWith('/mock-resources/', 2, 'falcon')
  })

  it('defaults to page 1 with no search when the URL has neither', async () => {
    searchParams.current = new URLSearchParams()
    vi.mocked(fetchSwapi).mockResolvedValue({
      count: 0,
      next: null,
      previous: null,
      results: [],
    })

    const MockResourcePage = createResourceListPage<MockResource>({
      title: 'MockResource',
      path: '/mock-resources/',
      renderItem: (widget) => widget.name,
    })

    renderWithClient(<MockResourcePage />)

    expect(await screen.findByText(/0 results/)).toBeInTheDocument()
    expect(fetchSwapi).toHaveBeenCalledWith('/mock-resources/', 1, undefined)
    expect(screen.getByPlaceholderText('Search…')).toHaveValue('')
  })
})
