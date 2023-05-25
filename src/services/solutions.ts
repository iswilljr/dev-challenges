import { prisma } from '@/utils/prisma'

interface ChallengeSolutionOptions extends ChallengeParams {
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
