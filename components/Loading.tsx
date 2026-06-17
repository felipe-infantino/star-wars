'use client'

import { motion } from 'motion/react'

type Props = {
    label?: string
}

export default function Loading({ label = 'Loading…' }: Props) {
    return (
        <div className="flex items-center gap-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="flex gap-1" role="status" aria-label={label}>
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-current"
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
                        transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </span>
            {label}
        </div>
    )
}
