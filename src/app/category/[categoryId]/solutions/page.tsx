import { SolutionCard } from '@/components/solution/card'
import { categories } from '@/utils/categories'
import { getCategoryChallengeSolutions, getSingleCategory } from '@/services/category'
import type { Metadata } from 'next'

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = 10

export async function generateStaticParams(): Promise<CategoryParams[]> {
  return categories.map(category => ({ categoryId: category.id }))
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const category = categories.find(category => category.id === params.categoryId)

  return {
    title: `${category?.title ?? ''} Category Solutions`,
    description: category?.description,
  }
}

export default async function ChallengeSolutions({ params }: CategoryPageParams) {
  const category = getSingleCategory(params)
  const solutions = await getCategoryChallengeSolutions(category.type)

  return (
    <section>
      <h1 className='text-2xl font-semibold'>{category.title}</h1>
      <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {solutions.length > 0 ? (
          solutions.map(solution => <SolutionCard key={solution.id} {...solution} />)
        ) : (
          <div className='space-y-4'>
            <p className='text-gray-400'>No solutions yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
