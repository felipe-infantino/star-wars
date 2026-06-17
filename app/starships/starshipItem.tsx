import Link from 'next/link'
import { Starship } from "./types"

export const starshipItem = (starship: Starship) => {
    const id = starship.url.split('/').filter(Boolean).pop()
    return (
        <Link href={`/starships/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{starship.name}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {starship.starship_class} · {starship.manufacturer} · crew {starship.crew}
            </p>
        </Link>
    )
}
