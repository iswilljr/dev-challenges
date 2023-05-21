export interface Options {
  type: string
  page?: number
}

export async function getOffers({ type, page = 1 }: Options) {
  const res = await fetch(
    `https://api.infojobs.net/api/7/offer?category=informatica-telecomunicaciones&q=${type}&page=${page}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.INFOJOBS_KEY as string}`,
      },
      cache: 'no-store',
    }
  )

  const data = await res.json()
  console.log(data)
  const offers = (data.items as any[])
    ?.filter(item => Boolean(item.requirementMin))
    .map(offer => ({
      id: offer.id,
      title: offer.title,
      image: offer.author.logoUrl,
      description: offer.requirementMin,
    }))

  return offers
}
