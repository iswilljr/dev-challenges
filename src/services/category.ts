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
      userId: {
        equals: null,
      },
    },
    orderBy: {
      difficulty: 'asc',
    },
  })

  return challenges
}

export async function getCategoryChallengeSolutions(type: ChallengeType) {
  const challenges = await prisma.solution.findMany({
    where: {
      challenge: {
        type,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return challenges
}

export async function getUserCategoryChallenges(type: ChallengeType) {
  const challenges = await prisma.challenge.findMany({
    where: {
      type,
      userId: {
        not: {
          equals: null,
        },
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      difficulty: 'asc',
    },
  })

  return challenges
}
