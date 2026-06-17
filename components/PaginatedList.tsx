'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { PaginatedResponse } from '@/lib/swapi'

const PAGE_SIZE = 10

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

type Props<T> = {
  data: PaginatedResponse<T>
  currentPage: number
  search?: string
  renderItem: (item: T) => React.ReactNode
}

export default function PaginatedList<T>({ data, currentPage, search, renderItem }: Props<T>) {
  const totalPages = Math.ceil(data.count / PAGE_SIZE)

  function pageHref(page: number) {
    const params = new URLSearchParams()
    params.set('page', String(page))
    if (search) params.set('search', search)
    return `?${params}`
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {data.count} results — page {currentPage} of {totalPages}
      </p>

      <motion.ul
        key={`${currentPage}-${search ?? ''}`}
        className="flex flex-col gap-3"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {data.results.map((item, i) => (
          <motion.li key={i} variants={itemVariants}>
            {renderItem(item)}
          </motion.li>
        ))}
      </motion.ul>

      <div className="flex items-center justify-between">
        {currentPage > 1 ? (
          <Link
            href={pageHref(currentPage - 1)}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}

        {data.next ? (
          <Link
            href={pageHref(currentPage + 1)}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
