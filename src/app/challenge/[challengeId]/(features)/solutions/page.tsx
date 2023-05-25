import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SolutionCard } from '@/components/solution/card'
import { getFullChallenge } from '@/services/challenge'

export default async function ChallengeSolutions({ params }: ChallengePageParams) {
  const challenge = await getFullChallenge(params)

  if (!challenge) return notFound()

  return (
    <section>
      <h2 className='text-xl font-semibold'>{challenge.title} Solutions</h2>
      <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {challenge.solutions.length > 0 ? (
          challenge.solutions.map(solution => <SolutionCard key={solution.id} {...solution} />)
        ) : (
          <div className='space-y-4'>
            <p className='text-gray-400'>
              No solutions yet.{' '}
              <Link className='text-blue-400 hover:underline' href={`/challenge/${challenge.id}/edit`}>
                Submit the first one.
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
