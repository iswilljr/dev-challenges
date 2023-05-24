import mql from '@microlink/mql'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const fallbackImg = new URL('/images/site-placeholder.png', url)

  try {
    const siteUrl = z.string().url('Invalid url').parse(url.searchParams.get('url'))

    const { status, data } = await mql(siteUrl, {
      screenshot: true,
    })

    if (status === 'fail' || !data.screenshot?.url) {
      throw Error(`Could not generate image from ${siteUrl}`)
    }

    const img = await fetch(data.screenshot.url).then(res => res.blob())

    return new Response(img)
  } catch (error) {
    const img = await fetch(fallbackImg).then(res => res.blob())
    return new Response(img)
  }
}
