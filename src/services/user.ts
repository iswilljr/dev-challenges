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

export async function getUserProfileIds() {
  const userIds = await prisma.user.findMany({
    select: {
      username: true,
    },
  })

  return userIds
}
