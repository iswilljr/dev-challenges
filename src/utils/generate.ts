import axios from 'redaxios'
import { createPrompt } from './prompts'
import type { ChallengeType } from '@prisma/client'
import type { Offer } from '@/types/offers'
import { generatedChallengeResponseSchema } from './schemas'

interface Options {
  offer?: Offer
  type?: ChallengeType
}

const API_URL = 'https://free.churchless.tech/v1/chat/completions'

const api = axios.create({
  baseURL: API_URL,
})

export async function generateChallenge({ offer, type }: Options) {
  const canCreateChallenge = (offer?.skillsList?.length ?? 0) > 0

  if (!canCreateChallenge || !offer) {
    throw Error('Can not create challenge with this offer')
  }

  if (!type) {
    throw Error('Can not create challenge without a type')
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

  return generatedResponse
}
