import Link from 'next/link'
import { Film } from "./types";
import { sanitizeProp } from '@/lib/sanitize'
import { parseResourceId } from '@/lib/resourceId'

export const filmItem = (film: Film) => {
    const id = parseResourceId(film.url)
    return (
        <Link href={`/films/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">
                Episode {sanitizeProp(film.episode_id, 'unknown')} — {sanitizeProp(film.title, 'Unknown film')}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Directed by {sanitizeProp(film.director, 'unknown director')} · {sanitizeProp(film.release_date, 'unknown release date')}
            </p>
        </Link>
    )
}
