import axios from 'redaxios'
import { NextResponse } from 'next/server'
import { jsonToChallenge } from '@/utils/convert'
import { generateChallengeSchema, generatedChallengeResponseSchema } from '@/utils/schemas'
import { createPrompt } from '@/utils/prompts'
import { prisma } from '@/utils/prisma'
import { getInfoJobsOfferById } from '@/services/offers'
import { getSessionUser } from '@/services/session'

const API_URL = 'https://free.churchless.tech/v1/chat/completions'

const api = axios.create({
  baseURL: API_URL,
})

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const session = await getSessionUser()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userChallenge = await prisma.challenge.findUnique({
    where: {
      userId: session.id,
    },
  })

  if (userChallenge) {
    return NextResponse.json({ message: 'User already have created custom challenge' }, { status: 400 })
  }

  const form = await req.json()
  const { offerId, type } = generateChallengeSchema.parse(form)
  const offer = await getInfoJobsOfferById(offerId)

  const canCreateChallenge = (offer.skillsList?.length ?? 0) > 0

  if (!canCreateChallenge) {
    return NextResponse.json({ message: 'Can not create challenge with this offer' }, { status: 400 })
  }

  const apiData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: createPrompt({ type }),
      },
      {
        role: 'user',
        content: JSON.stringify(offer.skillsList),
      },
    ],
  }

  const response = await api.post(API_URL, apiData)

  const data = JSON.parse(response.data.choices?.at(0)?.message?.content ?? '{}')
  const generatedResponse = generatedChallengeResponseSchema.parse(data)
  const challengeData = jsonToChallenge(generatedResponse.challenge, type)

  const challenge = await prisma.challenge.create({
    data: {
      ...challengeData,
      userId: session.id,
    },
  })

  return NextResponse.json(challenge)
}
