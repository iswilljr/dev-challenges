import { prisma } from '@/utils/prisma'

export async function getSingleUser({ profileId }: ProfileParams) {
  const user = await prisma.user.findUnique({
    where: {
      username: profileId,
    },
  })

  return user
}
