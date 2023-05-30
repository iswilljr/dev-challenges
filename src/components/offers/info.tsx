import { Badge } from '../badge/badge'
import type { Offer } from '@/types/offers'

interface OfferInfoProps {
  offer: Offer
  create: boolean
}

export function OfferInfo({ offer, create }: OfferInfoProps) {
  return (
    <div className='space-y-2'>
      <h2 className='text-xl font-bold'>{offer.title}</h2>
      <details className=''>
        <summary className=''>
          <p className='inline'>Description</p>
        </summary>
        <div className='text-sm text-gray-300'>{offer.description}</div>
      </details>
      {offer.minRequirements && (
        <details className=''>
          <summary className=''>
            <p className='inline'>Min Requirements</p>
          </summary>
          <div className='text-sm text-gray-300'>{offer.minRequirements}</div>
        </details>
      )}
      {!create && (
        <p className='text-sm text-red-300'>
          This offer does not have a skills list, you can not create a challenge with this offer
        </p>
      )}
      {create && (
        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Skills</h3>
          <div className='flex flex-wrap items-center gap-2'>
            {offer.skillsList?.map(({ skill }, index) => (
              <Badge color='sky' key={index}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
