import { ChallengeCard } from '@/components/challenge/card'
import { categories } from '@/utils/categories'
import { getCategoryChallenges, getSingleCategory } from '@/services/category'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const category = categories.find(category => category.id === params.categoryId)

  return {
    title: category?.title,
    description: category?.description,
  }
}

export async function generateStaticParams() {
  return categories.map(category => ({ categoryId: category.id }))
}

export default async function Category({ params }: CategoryPageParams) {
  const category = getSingleCategory(params)
  const challenges = await getCategoryChallenges(category.type)

  return (
    <>
      <section>
        <div className='rounded-md border border-gray-500 p-4'>
          <h2 className='text-xl font-semibold'>{category.title}</h2>
          <p className='mt-2'>{category.description}</p>
          <div className='space-y-4 py-4'>
            <article className='rounded-md border border-blue-700 bg-blue-700/5 p-4'>
              <h3 className='text-md font-medium'>Get into this category if you want to:</h3>
              <ul className='mt-2'>
                {category.interestingComments.map(comment => (
                  <li key={comment} className='list-inside list-disc'>
                    <p className='inline'>{comment}</p>
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
      <section>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {challenges.map(challenge => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </section>
    </>
  )
}
