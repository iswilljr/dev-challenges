import { prisma } from '@/utils/prisma'

interface ChallengeSolutionOptions extends ChallengeParams {
  userId: string
}

interface FullUserSolutionsOptions {
  userId: string
}

export async function getChallengeSolution({ challengeId, userId }: ChallengeSolutionOptions) {
  const solution = await prisma.solution.findFirst({
    where: {
      userId,
      challengeId,
    },
  })

  return solution
}

export async function getFullSolution({ solutionId }: SolutionParams) {
  const solution = await prisma.solution.findUnique({
    where: { id: solutionId },
    include: { user: true, challenge: true },
  })

  return solution
}

export async function getFullUserSolutions({ userId }: FullUserSolutionsOptions) {
  const solution = await prisma.solution.findMany({
    where: { userId },
    include: { challenge: true },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return solution
}
