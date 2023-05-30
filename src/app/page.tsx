import Link from 'next/link'
import { Card } from '@/components/card/card'
import { categories } from '@/utils/categories'
import { steps } from '@/utils/steps'

export default function Home() {
  return (
    <>
      <section>
        <h2 className='text-xl font-semibold'>How does Dev Challenges Work?</h2>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {steps.map(step => (
            <Card key={step.title} className='bg-transparent' {...step} />
          ))}
        </div>
      </section>
      <section>
        <div className='flex items-center justify-between gap-2'>
          <h2 className='text-xl font-semibold'>Challenge Categories</h2>
          <Link className='text-end text-blue-300' href='/challenge/create'>
            Create a custom challenge<span className='hidden md:inline'> with an InfoJobs Offer</span>
          </Link>
        </div>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map(category => (
            <Card
              key={category.title}
              href={category.href}
              image={category.image}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </section>
    </>
  )
}
