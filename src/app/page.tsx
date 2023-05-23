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
        <h2 className='text-xl font-semibold'>Challenge Categories</h2>
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
