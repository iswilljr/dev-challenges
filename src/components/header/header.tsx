'use client'

import { useSession } from 'next-auth/react'
import { SignInButton } from '../auth/buttons'
import { HeaderMenu } from './menu'

export function Header() {
  const { data, status } = useSession()

  return (
    <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-end bg-zinc-700 px-4 shadow-md'>
      {data != null ? <HeaderMenu profile={data.user?.image} /> : <SignInButton status={status} />}
    </header>
  )
}
