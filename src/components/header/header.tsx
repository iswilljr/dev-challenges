'use client'

import { useSession } from 'next-auth/react'
import { SignInButton } from '../auth/buttons'
import { HeaderMenu } from './menu'

export function Header() {
  const { data, status } = useSession()

  return (
    <header className='sticky top-0 z-50 h-16 bg-zinc-700 shadow-md'>
      <div className='mx-auto flex h-full w-full max-w-7xl items-center justify-end px-4'>
        {data != null ? <HeaderMenu profile={data.user?.image} /> : <SignInButton status={status} />}
      </div>
    </header>
  )
}
