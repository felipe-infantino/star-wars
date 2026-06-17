import Link from 'next/link'
import { Species } from "./types";
import { sanitizeProp } from '@/lib/sanitize'
import { parseResourceId } from '@/lib/resourceId'

export const speciesItem = (species: Species) => {
    const id = parseResourceId(species.url)
    return (
        <Link href={`/species/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{sanitizeProp(species.name, 'Unknown species')}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {sanitizeProp(species.classification, 'unknown classification')} · {sanitizeProp(species.designation, 'unknown designation')} · lang. {sanitizeProp(species.language, 'unknown')}
            </p>
        </Link>
    )
}
