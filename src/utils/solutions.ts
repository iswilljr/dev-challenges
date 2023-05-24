import { prisma } from './prisma'

interface ChallengeSolutionOptions {
  challengeId: string
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
