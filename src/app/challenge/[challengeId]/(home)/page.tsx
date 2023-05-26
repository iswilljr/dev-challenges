import { getSingleChallenge } from '@/services/challenge'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: ChallengePageParams): Promise<Metadata> {
  const challenge = await getSingleChallenge(params)

  return {
    title: `${challenge?.title ?? 'Challenge'}`,
    description: challenge?.description,
  }
}

export default async function Challenge({ params }: ChallengePageParams) {
  const challenges = await getSingleChallenge(params)

  if (!challenges) notFound()

  return (
    <section>
      <div className='rounded-md border border-gray-500 p-4 shadow-md'>
        <h2 className='text-xl font-semibold'>{challenges.title}</h2>
        <div className='space-y-4 py-4'>
          <article className='space-y-2 rounded-md border border-blue-700 bg-blue-700/5 p-4'>
            <p>
              <strong>Challenge:</strong> {challenges.description}
            </p>
            <p>
              <strong>Follow the instructions below:</strong>
            </p>
            <ul>
              {challenges.requirements.map(comment => (
                <li key={comment} className='list-inside list-disc'>
                  <p className='inline'>{comment}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className='space-y-2 rounded-md border border-green-700 bg-green-700/5 p-4'>
            <p>
              Once you have completed the challenge, submit your solution by providing the URLs for your GitHub
              repository and live application hosted on any platform. Additionally, please include a concise explanation
              of the work you have done.
            </p>
            <p>
              Furthermore, we encourage you to assess and offer feedback on the solutions submitted by other
              participants.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
