import { NextResponse } from 'next/server'
import { getErrorResponse } from '@/utils/error'
import { getInfoJobsOfferById } from '@/services/offers'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, context: OfferPageParams) {
  try {
    const offer = await getInfoJobsOfferById(context.params.offerId)

    return NextResponse.json(offer)
  } catch (error) {
    return getErrorResponse(error)
  }
}
