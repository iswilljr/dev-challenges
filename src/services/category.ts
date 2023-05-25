import { notFound } from 'next/navigation'
import { categories } from '@/utils/categories'
import { prisma } from '@/utils/prisma'
import type { ChallengeType } from '@prisma/client'

export function getSingleCategory(params: CategoryParams) {
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