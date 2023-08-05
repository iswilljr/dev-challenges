import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth-options'
import { CustomError, UnauthorizedError, getErrorResponse } from '@/utils/error'
import { prisma } from '@/utils/prisma'
import { editSolutionSubmissionSchema } from '@/utils/schemas'
import { getChallengeSolution } from '@/services/solutions'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new UnauthorizedError()
    }

    const form = await req.json()
    const data = editSolutionSubmissionSchema.parse(form)

    const challenge = await prisma.challenge.findUnique({
      where: { id: data.challengeId },
    })

    if (!challenge) {
      throw new CustomError({ message: 'Challenge not found', status: 404 })
    }

    const solution = await getChallengeSolution({ challengeId: challenge.id, userId: session.user.id })

    const createOrUpdateData = {
      challengeId: data.challengeId,
      demoURL: data.demoURL,
      description: data.description,
      repoURL: data.repoURL,
      title: data.title,
      userId: session.user.id,
    }

    const createdOrUpdated = solution
      ? await prisma.solution.update({ where: { id: solution.id }, data: createOrUpdateData })
      : await prisma.solution.create({ data: createOrUpdateData })

    return NextResponse.json(createdOrUpdated)
  } catch (error) {
    return getErrorResponse(error)
  }
}
