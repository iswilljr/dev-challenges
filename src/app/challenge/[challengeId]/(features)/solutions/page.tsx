import { Card } from '@/components/card/card'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ChallengeSolutions({ params }: ChallengePageParams) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: params.challengeId },
    include: {
      solutions: true,
    },
  })

  if (!challenge) return notFound()

  return (
    <section>
      <h2 className='text-xl font-semibold'>{challenge.title} Solutions</h2>
      <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {challenge.solutions.length > 0 ? (
          challenge.solutions.map(solution => (
            <Card
              key={solution.id}
              href={`/solution/${solution.id}`}
              image={`/api/url2img?url=${solution.demoURL}`}
              imageClassName='object-cover'
              title={solution.title}
              description={solution.description ?? ''}
              descriptionMaxLines
            />
          ))
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
