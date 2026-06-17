import Link from 'next/link'
import { People } from "./types";
import { sanitizeProp } from '@/lib/sanitize'

export const peopleItem = (person: People) => {
    const id = person.url.split('/').filter(Boolean).pop()
    return (
        <Link href={`/people/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{sanitizeProp(person.name, 'Unknown person')}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {sanitizeProp(person.gender, 'unknown gender')} · born {sanitizeProp(person.birth_year, 'unknown birth year')} · {sanitizeProp(person.height, 'unknown height', ' cm')} · {sanitizeProp(person.mass, 'unknown mass', ' kg')}
            </p>
        </Link>
    )
}
