import { notFound } from 'next/navigation'
import { EditSolutionSubmissionForm } from '@/components/forms/edit-solution-submission'
import { getUser } from '@/utils/get-user'
import { prisma } from '@/utils/prisma'
import { getChallengeSolution } from '@/utils/solutions'

export default async function ChallengeSubmission({ params }: ChallengePageParams) {
  const [user, challenge] = await Promise.all([
    getUser(),
    prisma.challenge.findUnique({
      where: { id: params.challengeId },
    }),
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
