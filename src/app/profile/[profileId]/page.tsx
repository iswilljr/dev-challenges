import { notFound } from 'next/navigation'
import { SolutionLargeCard } from '@/components/solution/card'
import { UserCard } from '@/components/user/card'
import { getFullUserSolutions } from '@/services/solutions'
import { getSessionUser } from '@/services/session'
import { getSingleUser } from '@/services/user'

export const dynamic = 'force-dynamic'

export default async function Profile({ params }: ProfilePageParams) {
  const [user, sessionUser] = await Promise.all([getSingleUser(params), getSessionUser()])

  if (!user) notFound()

  const userSolutions = await getFullUserSolutions({ userId: user.id })

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
      <section className='sm:col-span-1'>
        <UserCard user={user} editProfileButton={sessionUser?.id === user.id} />
      </section>
      <section className='space-y-2 sm:col-span-3'>
        <h2 className='text-xl font-semibold'>Solutions</h2>
        {userSolutions.length > 0 ? (
          <ul className='space-y-2'>
            {userSolutions.map(solution => (
              <li key={solution.id}>
                <SolutionLargeCard {...solution} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-lg text-gray-400'>No solutions yet.</div>
        )}
      </section>
    </div>
  )
}
