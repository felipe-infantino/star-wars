type Props = {
    fields: [string, string][]
}

export function PropsGrid({ fields }: Props) {
    return (
        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {fields.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-black/8 bg-white p-4 dark:border-white/[.145] dark:bg-zinc-900">
                    <dt className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</dt>
                    <dd className="mt-1 font-semibold">{value}</dd>
                </div>
            ))}
        </dl>
    )
}
