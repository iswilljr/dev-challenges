import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChallengeCard } from '@/components/challenge/card'
import { User } from '@/components/user/user'
import { Button } from '@/components/button/button'
import { formatDistance } from '@/utils/dates'
import { getSessionUser } from '@/services/session'
import { getFullSolution } from '@/services/solutions'

export const dynamic = 'force-dynamic'

export default async function Solution({ params }: SolutionPageParams) {
  const [solution, user] = await Promise.all([getFullSolution(params), getSessionUser()])

  if (!solution) notFound()

  const { user: solutionUser, challenge } = solution

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
      <section className='space-y-2 lg:col-span-3'>
        <div className='flex items-center justify-between'>
          <User {...solutionUser} />
          {solutionUser.id === user?.id && (
            <Button component={Link} href={`/challenge/${challenge.id}/edit`} variant='secondary'>
              Edit
            </Button>
          )}
        </div>
        <div>
          <h1 className='text-3xl font-semibold'>{solution.title}</h1>
          <div className='mt-0.5 text-sm text-gray-300'>
            <time dateTime={solution.updatedAt.toISOString()}>{formatDistance(solution.updatedAt)}</time>
          </div>
        </div>
        <p>{solution.description}</p>
        <div className='!mt-4 rounded-md border border-gray-500'>
          <div className='flex items-center justify-between gap-2 rounded-t-md bg-zinc-800/50 p-4'>
            <h2 className='text-xl font-semibold'>Preview</h2>
            <div className='flex items-center gap-2'>
              <Button
                component='a'
                target='_blank'
                rel='noopener noreferrer'
                href={solution.demoURL}
                variant='secondary'
              >
                Demo
              </Button>
              <Button component='a' target='_blank' rel='noopener noreferrer' href={solution.repoURL}>
                Code
              </Button>
            </div>
          </div>
          <div className='h-[720px] w-full'>
            <iframe className='h-full w-full' src={solution.demoURL} title={solution.title} />
          </div>
        </div>
      </section>
      <section className='col-span-1 row-start-1 lg:row-start-auto'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Challenge</h2>
          <ChallengeCard {...solution.challenge} descriptionClassName='line-clamp-2' />
        </div>
      </section>
    </div>
  )
}
