'use client'

import { useSession } from 'next-auth/react'
import { SignInButton } from '../auth/buttons'
import { HeaderMenu } from './menu'
import { Logo } from '../logo/logo'

export function Header() {
  const { data, status } = useSession()

  return (
    <header className='sticky top-0 z-50 h-16 bg-zinc-700 shadow-md'>
      <div className='mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4'>
        <Logo withTitle />
        {data != null ? (
          <div>
            <HeaderMenu profileImage={data.user.image} profile={data.user.username} />
          </div>
        ) : (
          <SignInButton status={status} />
        )}
      </div>
    </header>
  )
}
