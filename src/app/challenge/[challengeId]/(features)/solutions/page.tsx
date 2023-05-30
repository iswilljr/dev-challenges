import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge, getBadgeColorFromChallengeDifficulty } from '@/components/badge/badge'
import { SolutionCard } from '@/components/solution/card'
import { getChallengeIds, getFullChallenge, getSingleChallenge } from '@/services/challenge'
import type { Metadata } from 'next'

export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 10

export async function generateStaticParams(): Promise<ChallengeParams[]> {
  const challenges = await getChallengeIds()

  return challenges.map(challenge => ({ challengeId: challenge.id }))
}

export async function generateMetadata({ params }: ChallengePageParams): Promise<Metadata> {
  const challenge = await getSingleChallenge(params)

  return {
    title: `${challenge?.title ?? ''} Challenge Solutions`,
    description: challenge?.description,
  }
}

export default async function ChallengeSolutions({ params }: ChallengePageParams) {
  const challenge = await getFullChallenge(params)

  if (!challenge) return notFound()

  const difficultyBadgeColor = getBadgeColorFromChallengeDifficulty(challenge.difficulty)

  return (
    <section>
      <div className='flex items-center gap-2'>
        <h1 className='text-2xl font-semibold'>{challenge.title}</h1>
        <h2 className='flex items-center gap-1'>
          <Badge>{challenge.type}</Badge>
          <Badge color={difficultyBadgeColor}>{challenge.difficulty}</Badge>
        </h2>
      </div>
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
