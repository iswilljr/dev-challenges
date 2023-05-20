'use client'

import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
