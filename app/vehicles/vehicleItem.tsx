import Link from 'next/link'
import { Vehicle } from "./types";

export const vehicleItem = (vehicle: Vehicle) => {
    const id = vehicle.url.split('/').filter(Boolean).pop()
    return (
        <Link href={`/vehicles/${id}`} className="block rounded-lg border border-black/8 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <p className="font-semibold">{vehicle.name}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {vehicle.vehicle_class} · {vehicle.manufacturer} · crew {vehicle.crew}
            </p>
        </Link>
    )
}
