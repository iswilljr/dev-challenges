import { notFound } from 'next/navigation'
import { categories } from './categories'
import { prisma } from './prisma'
import type { ChallengeType } from '@prisma/client'

export function getCategoryFromParams(params: CategoryParams) {
  const category = categories.find(category => category.id === params.categoryId)

  if (!category) notFound()

  return category
}

export async function getCategoryChallenges(type: ChallengeType) {
  const challenges = await prisma.challenge.findMany({
    where: {
      type,
    },
    orderBy: {
      difficulty: 'asc',
    },
  })

  return challenges
}
