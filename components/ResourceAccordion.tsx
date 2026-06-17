import { Accordion } from '@/components/ui/accordion'

type Props<T> = {
    label: string
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

export function ResourceAccordion<T>({ label, items, renderItem }: Props<T>) {
    return (
        <Accordion label={label} count={items.length}>
            {items.length === 0
                ? <p className="text-sm text-zinc-500">None</p>
                : <div className="space-y-3">{items.map((item, i) => <div key={i}>{renderItem(item)}</div>)}</div>
            }
        </Accordion>
    )
}
