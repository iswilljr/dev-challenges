import { notFound } from 'next/navigation'
import { ChallengeCard } from '@/components/challenge/card'
import { CommentsProvider } from '@/components/comment/provider'
import { EditSolutionButton } from '@/components/button/edit-solution'
import { SolutionDemoPreview } from '@/components/solution/demo-preview'
import { SolutionFeedback } from '@/components/solution/feddback'
import { User } from '@/components/user/user'
import { MarkdownPreview } from '@/components/markdown/preview'
import { formatDistance } from '@/utils/dates'
import { getFullSolution } from '@/services/solutions'
import type { Metadata } from 'next'

export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 10
export const generateStaticParams = () => []

export async function generateMetadata({ params }: SolutionPageParams): Promise<Metadata> {
  const solution = await getFullSolution(params)

  return {
    title: `${solution?.title ?? 'Solution'} by ${solution?.user.name ?? solution?.user.username ?? 'User'}`,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    description: solution?.description || solution?.challenge.description,
  }
}

export default async function Solution({ params }: SolutionPageParams) {
  const solution = await getFullSolution(params)

  if (!solution) notFound()

  const { user, challenge } = solution

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
      <section className='space-y-2 lg:col-span-3'>
        <div className='flex items-center justify-between first:[&_a]:max-w-[70%]'>
          <User {...user} />
          <EditSolutionButton user={user} challenge={challenge} />
        </div>
        <div>
          <h1 className='text-3xl font-semibold'>{solution.title}</h1>
          <div className='mt-0.5 text-sm text-gray-300'>
            <time dateTime={solution.updatedAt.toISOString()}>{formatDistance(solution.updatedAt)}</time>
          </div>
        </div>
        {solution.description && <MarkdownPreview content={solution.description} />}
        <SolutionDemoPreview {...solution} />
        <CommentsProvider comments={solution.comments}>
          <SolutionFeedback solution={solution} challenge={solution.challenge} />
        </CommentsProvider>
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
