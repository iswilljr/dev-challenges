import { Card } from '@/components/card/card'
import { categories } from '@/utils/categories'
import { steps } from '@/utils/steps'

export default function Home() {
  return (
    <div className='space-y-8 py-8'>
      <section className='mx-auto max-w-7xl px-4'>
        <h2 className='text-xl font-semibold'>How does Dev Challenges Work?</h2>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:sm:grid-cols-3'>
          {steps.map(step => (
            <Card key={step.title} className='bg-transparent' {...step} />
          ))}
        </div>
      </section>
      <section className='mx-auto max-w-7xl px-4'>
        <h2 className='text-xl font-semibold'>Challenge Categories</h2>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:sm:grid-cols-3'>
          {categories.map(step => (
            <Card key={step.title} {...step} />
          ))}
        </div>
      </section>
    </div>
  )
}
