import { Categories } from '@/components/categories/categories'
import { authOptions } from '@/utils/auth-options'
import { getCategoryFromParams } from '@/utils/get-category'
import { prisma } from '@/utils/prisma'
import { getServerSession } from 'next-auth'
import type { ChallengeType } from '@prisma/client'

async function getCategoryChallenges(type: ChallengeType) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return null

    const challenges = await prisma.challenge.findMany({
      where: {
        userId: session.user.id,
        type,
      },
    })

    return challenges
  } catch (error) {
    return null
  }
}

export default async function Category({ params }: { params: { categoryId: string } }) {
  const category = getCategoryFromParams(params)
  const challenges = await getCategoryChallenges(category.type)

  return (
    <div className='space-y-8 py-8'>
      <section className='mx-auto max-w-7xl px-4'>
        <div className='rounded-md border border-gray-500 p-4'>
          <h2 className='text-xl font-semibold'>{category.title}</h2>
          <p className='mt-2'>{category.description}</p>
          <div className='space-y-4 py-4'>
            <article className='rounded-md border border-blue-700 bg-blue-700/5 p-4'>
              <h3 className='text-md font-medium'>Get into this category if you want to:</h3>
              <ul className='mt-2'>
                {category.interestingComments.map(comment => (
                  <li key={comment} className='list-inside list-disc'>
                    <p className='inline-block'>{comment}</p>
                  </li>
                ))}
              </ul>
            </article>
            <article className='rounded-md border border-green-700 bg-green-700/5 p-4'>
              <h3 className='text-md font-medium'>Guide:</h3>
              <ul className='mt-2'>
                {category.guide.map(comment => (
                  <li key={comment} className='list-inside list-disc'>
                    <p className='inline'>{comment}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <section className='mx-auto max-w-7xl px-4'>
        <Categories challenges={challenges} />
      </section>
    </div>
  )
}
