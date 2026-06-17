import Link from 'next/link'
import { Planet } from "./types";
import { sanitizeProp } from '@/lib/sanitize'
import { parseResourceId } from '@/lib/resourceId'

export const planetItem = (planet: Planet) => {
    const id = parseResourceId(planet.url)
    return (
        <Link href={`/planets/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{sanitizeProp(planet.name, 'Unknown planet')}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {sanitizeProp(planet.climate, 'unknown climate')} · {sanitizeProp(planet.terrain, 'unknown terrain')} · pop. {sanitizeProp(planet.population, 'unknown')}
            </p>
        </Link>
    )
}
