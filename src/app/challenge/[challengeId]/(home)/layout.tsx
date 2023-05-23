import Link from 'next/link'
import { Button } from '@/components/button/button'
import { prisma } from '@/utils/prisma'

export async function generateStaticParams(): Promise<ChallengeParams[]> {
  const challenges = await prisma.challenge.findMany()

  return challenges.map(challenge => ({ challengeId: challenge.id }))
}

export default function ChallengeLayout({ children, params }: React.PropsWithChildren<ChallengePageParams>) {
  return (
    <div className='grid gap-4 lg:grid-cols-12'>
      <div className='lg:col-span-9'>{children}</div>
      <div className='lg:col-span-3'>
        <div className='space-y-4 rounded-md bg-zinc-800/50 p-4 shadow-md'>
          <p>
            <strong className='text-xl font-semibold'>How to start</strong>
          </p>
          <ul className='list-inside list-decimal'>
            <li>Read the challenge's details</li>
            <li>Start the challenge</li>
            <li>Have fun coding!!</li>
          </ul>
          <div className='space-y-2'>
            <Button
              component={Link}
              className='w-full'
              variant='secondary'
              href={`/challenge/${params.challengeId}/solutions`}
            >
              View Solutions
            </Button>
            <Button component={Link} href={`/challenge/${params.challengeId}/edit`} className='w-full'>
              Submit solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
