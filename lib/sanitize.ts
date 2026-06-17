// SWAPI fields are typed as required strings but can arrive null/undefined/empty
// at runtime, which would otherwise render as "undefined" or a stray unit suffix.
export function sanitizeProp(
    value: string | number | null | undefined,
    fallback: string,
    suffix = '',
): string {
    if (value === null || value === undefined) return fallback
    const str = String(value).trim()
    if (str === '') return fallback
    return `${str}${suffix}`
}
