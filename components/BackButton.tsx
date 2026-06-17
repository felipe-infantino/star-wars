'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
            ← Back
        </button>
    )
}
