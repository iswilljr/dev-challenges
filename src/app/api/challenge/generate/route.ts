import { NextResponse } from 'next/server'
import { jsonToChallenge } from '@/utils/convert'
import { generateChallengeSchema } from '@/utils/schemas'
import { prisma } from '@/utils/prisma'
import { getSessionUser } from '@/services/session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
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
    console.error(error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
  }
}
