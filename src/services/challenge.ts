import { prisma } from '@/utils/prisma'

export async function getChallenges() {
  return await prisma.challenge.findMany()
}

export async function getFullChallenge({ challengeId }: ChallengeParams) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      solutions: {
        include: {
          user: true,
        },
      },
    },
  })

  return challenge
}

export async function getSingleChallenge({ challengeId }: ChallengeParams) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  })

  return challenge
}
