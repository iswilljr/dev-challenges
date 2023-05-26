import { notFound } from 'next/navigation'
import { ChallengeCard } from '@/components/challenge/card'
import { EditSolutionSubmissionForm } from '@/components/forms/edit-solution-submission'
import { getSessionUserOrRedirect } from '@/services/session'
import { getChallengeSolution } from '@/services/solutions'
import { getSingleChallenge } from '@/services/challenge'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ChallengePageParams): Promise<Metadata> {
  const challenge = await getSingleChallenge(params)

  return {
    title: `${challenge?.title ?? ''} Challenge Submission`,
    description: challenge?.description,
  }
}

export default async function ChallengeSubmission({ params }: ChallengePageParams) {
  const [user, challenge] = await Promise.all([
    getSessionUserOrRedirect({
      redirect: `/challenge/${params.challengeId}`,
      callbackUrl: `/challenge/${params.challengeId}/edit`,
    }),
    getSingleChallenge(params),
  ])

  if (!challenge || !user) notFound()

  const solution = await getChallengeSolution({ challengeId: challenge.id, userId: user.id })

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
      <div className='lg:col-span-3'>
        <section className='space-y-4 rounded-md border border-gray-500 bg-zinc-600/50 p-4'>
          <h2 className='text-xl font-semibold'>Submit Solution</h2>
          <EditSolutionSubmissionForm initialSolution={solution} />
        </section>
      </div>
      <div className='col-span-1 row-start-1 space-y-2 lg:row-start-auto'>
        <div className='space-y-4 rounded-md border border-gray-500 bg-gray-800/50 p-4 shadow-md'>
          <p>
            <strong className='text-xl font-semibold'>Before submitting</strong>
          </p>
          <ul className='list-inside list-decimal'>
            <li>Make sure you have followed all the instructions</li>
            <li>Have the Live Demo URL and Repo URL</li>
            <li>Try to explain your approach briefly</li>
          </ul>
        </div>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Challenge</h2>
          <ChallengeCard {...challenge} descriptionClassName='line-clamp-2' />
        </div>
      </div>
    </div>
  )
}
