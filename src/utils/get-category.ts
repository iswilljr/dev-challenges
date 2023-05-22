import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { categories } from './categories'
import { authOptions } from './auth-options'
import { prisma } from './prisma'
import type { ChallengeType } from '@prisma/client'

export function getCategoryFromParams(params: { categoryId: string }) {
  const category = categories.find(category => category.id === params.categoryId)

  if (!category) notFound()

  return category
}

export async function getCategoryChallenges(type: ChallengeType) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return null

    const challenges = await prisma.challenge.findMany({
      where: {
        userId: session.user.id,
        type,
      },
    })

    return challenges
  } catch (error) {
    return null
  }
}
