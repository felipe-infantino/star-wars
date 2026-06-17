'use client'

import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchSwapi, fetchSwapiByUrl, PaginatedResponse } from '@/lib/swapi'

export function useSwapiList<T>(path: string, page: number, search?: string) {
  return useQuery<PaginatedResponse<T>>({
    queryKey: ['swapi', 'list', path, page, search ?? ''],
    queryFn: () => fetchSwapi<T>(path, page, search),
  })
}

export function useSwapiResource<T>(url: string) {
  return useQuery<T>({
    queryKey: ['swapi', 'resource', url],
    queryFn: () => fetchSwapiByUrl<T>(url),
    enabled: !!url,
  })
}

export function useSwapiResources<T>(urls: string[]) {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: ['swapi', 'resource', url],
      queryFn: () => fetchSwapiByUrl<T>(url),
    })),
    combine: (results) => ({
      items: results.map((r) => r.data).filter((d): d is T => d !== undefined),
      isLoading: results.some((r) => r.isLoading),
      isError: results.some((r) => r.isError),
    }),
  })
}
