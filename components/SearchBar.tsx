'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState(defaultValue)
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    // Only navigate when the user actually changes the query. On mount (and on
    // pagination, which re-renders with the same search) the values match, so we
    // leave the URL — and its ?page — untouched.
    if (debouncedQuery === defaultValue) return
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('search', debouncedQuery)
    router.push(`${pathname}${params.size ? `?${params}` : ''}`)
  }, [debouncedQuery, defaultValue, pathname, router])

  return (
    <div className="mb-8 flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
        className="flex-1 rounded-lg border border-black/8 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-white/[.145] dark:bg-zinc-900 dark:focus:ring-white/20"
      />
    </div>
  )
}
