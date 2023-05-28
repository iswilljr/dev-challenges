import { prisma } from '@/utils/prisma'

export async function getSingleUser({ profileId }: ProfileParams) {
  const user = await prisma.user.findUnique({
    where: {
      username: profileId,
    },
  })

  return user
}

export async function getFullUserProfile({ profileId }: ProfileParams) {
  const user = await prisma.user.findUnique({
    where: {
      username: profileId,
    },
    include: {
      comments: {
        include: {
          solution: true,
        },
      },
      solutions: {
        include: {
          challenge: true,
        },
      },
    },
  })

  return user
}
