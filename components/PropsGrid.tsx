'use client'

import { motion } from 'motion/react'

type Props = {
    fields: [string, string][]
}

const gridVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.04 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 8 },
    show: { opacity: 1, scale: 1, y: 0 },
}

export function PropsGrid({ fields }: Props) {
    return (
        <motion.dl
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate="show"
        >
            {fields.map(([label, value]) => (
                <motion.div
                    key={label}
                    variants={cardVariants}
                    className="rounded-lg border border-black/8 bg-white p-4 dark:border-white/[.145] dark:bg-zinc-900"
                >
                    <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</dt>
                    <dd className="mt-1 font-semibold">{value}</dd>
                </motion.div>
            ))}
        </motion.dl>
    )
}
