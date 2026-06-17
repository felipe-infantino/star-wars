'use client'

import { useEffect, useState } from 'react'

import { BASE_URL } from '@/lib/swapi'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export function ProductionTestFetch({ path = '/people/?page=1' }) {
  const [status, setStatus] = useState<Status>('idle')
  const [httpStatus, setHttpStatus] = useState<number | null>(null)
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    const url = `${BASE_URL}${path}`
    setStatus('loading')

    fetch(url)
      .then(async (res) => {
        setHttpStatus(res.status)
        const text = await res.text()
        console.log('[ProductionTestFetch] url:', url)
        console.log('[ProductionTestFetch] status:', res.status, res.statusText)
        console.log('[ProductionTestFetch] body:', text)
        setBody(text)
        setStatus(res.ok ? 'ok' : 'error')
      })
      .catch((err) => {
        console.error('[ProductionTestFetch] fetch failed:', err)
        setBody(String(err))
        setStatus('error')
      })
  }, [path])

  console.log("status", status)
  console.log("httpStatus", httpStatus)
  console.log("body", body)

  return (
    <></>
  )
}
