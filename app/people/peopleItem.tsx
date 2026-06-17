import Link from 'next/link'
import { People } from "./types";

export const peopleItem = (person: People) => {
    const id = person.url.split('/').filter(Boolean).pop()
    return (
        <Link href={`/people/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{person.name}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {person.gender} · born {person.birth_year} · {person.height} cm · {person.mass} kg
            </p>
        </Link>
    )
}
