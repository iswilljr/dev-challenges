import { GeneralForm } from '@/components/forms/general-settings'
import { getSessionUserOrRedirect } from '@/services/session'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getSessionUserOrRedirect({ callbackUrl: '/settings' })

  return (
    <>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>General Settings</h2>
        <div className='rounded-md border border-gray-500 bg-zinc-600/50 p-4'>
          <GeneralForm user={user} />
        </div>
      </section>
    </>
  )
}
