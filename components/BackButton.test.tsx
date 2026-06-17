import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import BackButton from './BackButton'

const back = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back }),
}))

describe('BackButton', () => {
  it('calls router.back() when clicked', async () => {
    render(<BackButton />)

    await userEvent.click(screen.getByRole('button', { name: '← Back' }))

    expect(back).toHaveBeenCalledOnce()
  })
})
