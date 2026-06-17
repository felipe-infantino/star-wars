import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SearchBar from './SearchBar'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/people',
}))

describe('SearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    push.mockClear()
  })

  it('renders with the given default value', () => {
    render(<SearchBar defaultValue="luke" />)
    expect(screen.getByPlaceholderText('Search…')).toHaveValue('luke')
  })

  it('does not navigate on mount, preserving deep-linked params like ?page=2', () => {
    render(<SearchBar defaultValue="luke" />)
    act(() => vi.advanceTimersByTime(500))

    expect(push).not.toHaveBeenCalled()
  })

  it('does not navigate with the new query before the debounce delay elapses', () => {
    render(<SearchBar />)

    fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'r2d2' } })

    expect(push).not.toHaveBeenLastCalledWith('/people?search=r2d2')
  })

  it('navigates with the search query after the debounce delay', () => {
    render(<SearchBar />)

    fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'r2d2' } })
    act(() => vi.advanceTimersByTime(500))

    expect(push).toHaveBeenLastCalledWith('/people?search=r2d2')
  })

  it('navigates without a search param once the query is cleared', () => {
    render(<SearchBar defaultValue="luke" />)

    fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: '' } })
    act(() => vi.advanceTimersByTime(500))

    expect(push).toHaveBeenLastCalledWith('/people')
  })
})
