'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from './button'

export function SubmitSolutionButton({ challengeId }: ChallengeParams) {
  const { status } = useSession()

  return (
    <Button
      component={Link}
      aria-disabled={status !== 'authenticated'}
      href={`/challenge/${challengeId}/edit`}
      className='w-full aria-disabled:pointer-events-none aria-disabled:select-none aria-disabled:opacity-50'
    >
      Submit solution
    </Button>
  )
}
