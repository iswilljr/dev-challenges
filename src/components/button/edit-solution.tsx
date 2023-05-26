'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from './button'
import type { Challenge, User } from '@prisma/client'

interface EditSolutionButtonProps {
  challenge: Challenge
  user: User
}

export function EditSolutionButton({ challenge, user }: EditSolutionButtonProps) {
  const { data } = useSession()

  return (
    <>
      {user.id === data?.user?.id && (
        <Button className='py-1' component={Link} href={`/challenge/${challenge.id}/edit`} variant='secondary'>
          Edit
        </Button>
      )}
    </>
  )
}
