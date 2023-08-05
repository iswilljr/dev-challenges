import { NextResponse } from 'next/server'
import { jsonToChallenge } from '@/utils/convert'
import { CustomError, UnauthorizedError, getErrorResponse } from '@/utils/error'
import { generateChallengeSchema } from '@/utils/schemas'
import { prisma } from '@/utils/prisma'
import { getSessionUser } from '@/services/session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const session = await getSessionUser()

    if (!session) {
      throw new UnauthorizedError()
    }

    const userChallenge = await prisma.challenge.findUnique({
      where: {
        userId: session.id,
      },
    })

    if (userChallenge) {
      throw new CustomError({ message: 'User already has created custom challenge' })
    }

    const form = await req.json()
    const { generatedChallenge, type } = generateChallengeSchema.parse(form)

    const challengeData = jsonToChallenge(generatedChallenge.challenge, type)

    const challenge = await prisma.challenge.create({
      data: {
        ...challengeData,
        user: {
          connect: { id: session.id },
        },
      },
    })

    return NextResponse.json(challenge)
  } catch (error) {
    return getErrorResponse(error)
  }
}
