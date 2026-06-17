import Link from 'next/link'

const routes = [
  { href: '/people', label: 'People' },
  { href: '/planets', label: 'Planets' },
  { href: '/films', label: 'Films' },
  { href: '/species', label: 'Species' },
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/starships', label: 'Starships' },
]

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Star Wars</h1>
      <ul className="flex flex-col gap-3">
        {routes.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center justify-between rounded-lg border border-black/8 bg-white px-5 py-4 font-medium transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              {label}
              <span className="text-zinc-400">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
