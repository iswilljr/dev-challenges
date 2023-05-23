import { redirect as NextRedirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'

interface UserOrRedirectOptions {
  redirect?: string
  callbackUrl?: string
}

export async function getUserOrRedirect({ redirect = '/', callbackUrl }: UserOrRedirectOptions = {}) {
  const user = await getUser()

  const redirectUrl = callbackUrl ? `${redirect}?callbackUrl=${callbackUrl}` : redirect

  if (!user) NextRedirect(redirectUrl)

  return user
}

export async function getUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
