import Link from 'next/link'
import { Film } from "./types";

export const filmItem = (film: Film) => {
    const id = film.url.split('/').filter(Boolean).pop()
    return (
        <Link href={`/films/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">
                Episode {film.episode_id} — {film.title}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Directed by {film.director} · {film.release_date}
            </p>
        </Link>
    )
}
