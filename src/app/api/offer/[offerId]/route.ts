import { NextResponse } from 'next/server'
import { getInfoJobsOfferById } from '@/services/offers'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, context: OfferPageParams) {
  try {
    const offer = await getInfoJobsOfferById(context.params.offerId)

    return NextResponse.json(offer)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
