import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'

export async function getUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect('/')

  return session.user
}
