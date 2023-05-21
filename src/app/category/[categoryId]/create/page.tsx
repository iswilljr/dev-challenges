import { Offers } from '@/components/offers/offers'
import { getCategoryFromParams } from '@/utils/get-category'
import { getOffers } from '@/utils/get-offers'
import { getUser } from '@/utils/get-user'

export default async function Create({ params }: { params: { categoryId: string } }) {
  const category = getCategoryFromParams(params)
  await getUser()

  const offers = await getOffers({ type: category.id })

  return (
    <div className='space-y-8 pt-8'>
      <Offers initialOffers={offers} />
    </div>
  )
}
