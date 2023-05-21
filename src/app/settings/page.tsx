import { GeneralForm } from '@/components/forms/general-form'
import { authOptions } from '@/utils/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function getUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect('/')

  return session.user
}

export default async function Home() {
  const user = await getUser()

  return (
    <div className='space-y-8 py-8'>
      <section className='mx-auto max-w-7xl px-4'>
        <h2 className='text-xl font-semibold'>Settings</h2>
        <div className='mt-4 rounded-md border border-gray-500 bg-zinc-600/50 p-4'>
          <h3 className='text-lg font-semibold'>General</h3>
          <GeneralForm user={user} />
        </div>
      </section>
    </div>
  )
}
