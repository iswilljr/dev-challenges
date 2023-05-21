import { getOffers } from '@/utils/get-offers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const type = url.searchParams.get('type')
    const page = Number(url.searchParams.get('page') ?? '') || 1

    if (!type) return NextResponse.json([])

    const offers = await getOffers({ type, page })

    return NextResponse.json(offers)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
