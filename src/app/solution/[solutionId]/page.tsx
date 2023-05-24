import Link from 'next/link'
import { notFound } from 'next/navigation'
import { User } from '@/components/user/user'
import { Button } from '@/components/button/button'
import { formatDistance } from '@/utils/dates'
import { getUser } from '@/utils/get-user'
import { prisma } from '@/utils/prisma'

export const dynamic = 'force-dynamic'

export default async function Solution({ params }: SolutionPageParams) {
  const [solution, user] = await Promise.all([
    prisma.solution.findUnique({
      where: { id: params.solutionId },
      include: { user: true, challenge: true },
    }),
    getUser(),
  ])

  if (!solution) notFound()

  const { user: solutionUser, challenge } = solution

  return (
    <>
      <section className='space-y-2'>
        <div className='flex items-center justify-between'>
          <User
            name={solutionUser.name ?? solutionUser.username}
            profile={solutionUser.username}
            profileImage={solutionUser.image}
          />
          {solutionUser.id === user?.id && (
            <Button component={Link} href={`/challenge/${challenge.id}/edit`} variant='secondary'>
              Edit
            </Button>
          )}
        </div>
        <div>
          <h1 className='text-3xl font-semibold'>{challenge.title}</h1>
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
    </>
  )
}
