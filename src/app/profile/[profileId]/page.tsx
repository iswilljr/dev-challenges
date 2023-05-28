import { notFound } from 'next/navigation'
import { SolutionFeedbackCard, SolutionLargeCard } from '@/components/solution/card'
import { UserCard } from '@/components/user/card'
import { getSessionUser } from '@/services/session'
import { getFullUserProfile, getSingleUser } from '@/services/user'
import type { Metadata } from 'next'

export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 10
export const generateStaticParams = () => []

export async function generateMetadata({ params }: ProfilePageParams): Promise<Metadata> {
  const user = await getSingleUser(params)

  return {
    title: `${user?.name ?? user?.username ?? 'Profile'}`,
  }
}

export default async function Profile({ params }: ProfilePageParams) {
  const [user, sessionUser] = await Promise.all([getFullUserProfile(params), getSessionUser()])

  if (!user) notFound()

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
      <section className='sm:col-span-1'>
        <UserCard user={user} editProfileButton={sessionUser?.id === user.id} />
      </section>
      <div className='space-y-2 sm:col-span-3'>
        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Solutions</h2>
          {user.solutions.length > 0 ? (
            <ul className='space-y-2'>
              {user.solutions.map(solution => (
                <li key={solution.id}>
                  <SolutionLargeCard {...solution} />
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-lg text-gray-400'>No solutions yet.</div>
          )}
        </section>
        {user.comments.length > 0 && (
          <section className='space-y-2'>
            <h2 className='text-xl font-semibold'>Feedback</h2>
            <ul className='space-y-2'>
              {user.comments.map(comment => (
                <li key={comment.id}>
                  <SolutionFeedbackCard {...comment} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
