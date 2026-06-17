import Link from 'next/link'
import { Species } from "./types";

export const speciesItem = (species: Species) => {
    const id = species.url.split('/').filter(Boolean).pop()
    return (
        <Link href={`/species/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{species.name}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {species.classification} · {species.designation} · lang. {species.language}
            </p>
        </Link>
    )
}
