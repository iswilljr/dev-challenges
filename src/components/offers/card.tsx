import { Card, type CardProps } from '../card/card'
import type { Item } from '@/types/offers'

interface OfferCardProps extends Omit<CardProps, 'title'> {
  offer: Item
}

export function OfferCard({ offer, ...props }: OfferCardProps) {
  return (
    <Card
      {...props}
      className='cursor-pointer ring-0 duration-300 hover:border-gray-400/90 hover:bg-gray-800/70'
      title={offer.title ?? ''}
      bottomSection={
        <div className='text-sm'>
          <p>
            <strong className='font-medium'>Author:</strong> <span className='text-gray-300'>{offer.author?.name}</span>
          </p>
          <p>
            <strong className='font-medium'>City:</strong> <span className='text-gray-300'>{offer.city}</span>
          </p>
          <p>
            <strong className='font-medium'>Contract Type:</strong>{' '}
            <span className='text-gray-300'>{offer.contractType?.value}</span>
          </p>
          <p>
            <strong className='font-medium'>Min Experience:</strong>{' '}
            <span className='text-gray-300'>{offer.experienceMin?.value}</span>
          </p>
          <p>
            <strong className='font-medium'>Salary:</strong>{' '}
            <span className='text-gray-300'>{offer.salaryDescription}</span>
          </p>
          <p>
            <strong className='font-medium'>Study:</strong> <span className='text-gray-300'>{offer.study?.value}</span>
          </p>
        </div>
      }
    />
  )
}
