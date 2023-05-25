import { redirect as NextRedirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth-options'

interface UserOrRedirectOptions {
  redirect?: string
  callbackUrl?: string
}

export async function getSessionUserOrRedirect({ redirect = '/', callbackUrl }: UserOrRedirectOptions = {}) {
  const user = await getSessionUser()

  const redirectUrl = callbackUrl ? `${redirect}?callbackUrl=${callbackUrl}` : redirect

  if (!user) NextRedirect(redirectUrl)

  return user
}

export async function getSessionUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
