import { NextResponse } from 'next/server'
import { getInfoJobsOffers } from '@/services/offers'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = Number(url.searchParams.get('page') ?? '') || 1

    const offers = await getInfoJobsOffers({ page })

    return NextResponse.json(offers)
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
