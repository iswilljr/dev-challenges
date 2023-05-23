import { GeneralForm } from '@/components/forms/general-form'
import { getUserOrRedirect } from '@/utils/get-user'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getUserOrRedirect({ callbackUrl: '/settings' })

  return (
    <>
      <section>
        <h2 className='text-xl font-semibold'>Settings</h2>
        <div className='mt-4 rounded-md border border-gray-500 bg-zinc-600/50 p-4'>
          <h3 className='text-lg font-semibold'>General</h3>
          <GeneralForm user={user} />
        </div>
      </section>
    </>
  )
}
