
export function parseResourceId(url: string | null | undefined): string | null {
    if (!url) return "not-found"
    const id = String(url).split('/').filter(Boolean).pop()
    return id || "not-found"
}
