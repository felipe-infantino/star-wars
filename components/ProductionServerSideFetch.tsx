import { BASE_URL } from '@/lib/swapi'

export async function ProductionServerSideFetch({
  path = '/people/?page=1',
}: {
  path?: string
}) {
  const url = `${BASE_URL}${path}`

  let httpStatus: number | null = null
  let ok = false
  let body = ''

  try {
    const res = await fetch(url, { cache: 'no-store' })
    httpStatus = res.status
    ok = res.ok
    body = await res.text()
    console.log('[ProductionServerSideFetch] url:', url)
    console.log('[ProductionServerSideFetch] status:', res.status, res.statusText)
    console.log('[ProductionServerSideFetch] body:', body.slice(0, 500))
  } catch (err) {
    console.error('[ProductionServerSideFetch] fetch failed:', err)
    body = String(err)
  }

  console.log('[ProductionServerSideFetch] httpStatus', httpStatus)
  console.log('[ProductionServerSideFetch] ok', ok)
  console.log('[ProductionServerSideFetch] body', body.slice(0, 500))

  return (
    <></>
  )
}
