import { Card } from '@/components/card/card'
import { Offers } from '@/components/offers/offers'
import { createChallengeSteps } from '@/utils/steps'
import { getInfoJobsOffers } from '@/services/offers'
import { getSessionUserOrRedirect } from '@/services/session'

export default async function Create() {
  const [offers] = await Promise.all([
    getInfoJobsOffers(),
    getSessionUserOrRedirect({ callbackUrl: '/challenge/create' }),
  ])

  return (
    <div className='space-y-8 pt-8'>
      <section>
        <h1 className='text-2xl font-bold'>How to create your custom challenge with an InfoJobs Offer?</h1>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {createChallengeSteps.map(step => (
            <Card key={step.title} className='bg-transparent' {...step} />
          ))}
        </div>
      </section>
      <Offers initialOffers={offers} />
    </div>
  )
}
