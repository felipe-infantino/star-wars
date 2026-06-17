export function Accordion({
  label,
  count,
  children,
}: {
  label: string
  count: number
  children: React.ReactNode
}) {
  return (
    <details className="group rounded-lg border border-black/8 bg-white dark:border-white/[.145] dark:bg-zinc-900">
      <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-3 font-semibold">
        <span>{label} <span className="ml-1 text-sm font-normal text-zinc-400">({count})</span></span>
        <span className="text-zinc-400 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="border-t border-black/8 p-4 dark:border-white/[.145]">
        {children}
      </div>
    </details>
  )
}
