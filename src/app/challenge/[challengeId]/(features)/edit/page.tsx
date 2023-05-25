import { notFound } from 'next/navigation'
import { EditSolutionSubmissionForm } from '@/components/forms/edit-solution-submission'
import { getSessionUserOrRedirect } from '@/services/session'
import { getChallengeSolution } from '@/services/solutions'
import { getSingleChallenge } from '@/services/challenge'

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
    <section className='space-y-4 rounded-md border border-gray-500 bg-zinc-600/50 p-4'>
      <h2 className='text-xl font-semibold'>Submit Solution</h2>
      <EditSolutionSubmissionForm initialSolution={solution} />
    </section>
  )
}
