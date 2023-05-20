'use client'

import { useSearchParams } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { BsGithub } from 'react-icons/bs'
import { Button } from '../button/button'

interface SignInButtonProps {
  status: 'loading' | 'unauthenticated'
}

export function SignInButton({ status }: SignInButtonProps) {
  const search = useSearchParams()

  return status === 'unauthenticated' ? (
    <Button
      className='w-40 text-xs'
      icon={<BsGithub className='h-4 w-4' />}
      variant='outlined'
      onClick={() => {
        signIn('github', {
          redirect: false,
          callbackUrl: search.get('callbackUrl') ?? '/',
        }).catch(err => console.error(err))
      }}
    >
      Sign in with Github
    </Button>
  ) : (
    <div role='status' className='w-40 animate-pulse rounded-md bg-gray-500/50 py-4 text-xs'>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export function SignOutButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} onClick={() => signOut({ redirect: false })} />
}
