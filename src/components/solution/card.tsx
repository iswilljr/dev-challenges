import Link from 'next/link'
import { formatDistance } from '@/utils/dates'
import { Badge, getBadgeColorFromChallengeDifficulty } from '../badge/badge'
import { Card } from '../card/card'
import { User } from '../user/user'
import type { Challenge, Solution, User as UserType } from '@prisma/client'

interface SolutionCardProps extends Solution {
  user: UserType
}

export function SolutionCard({ id, title, description, user }: SolutionCardProps) {
  return (
    <Card
      description={description ?? ''}
      descriptionMaxLines
      href={`/solution/${id}`}
      title={title}
      topSection={<User {...user} />}
    />
  )
}

interface SolutionLargeCardProps extends Solution {
  challenge: Challenge
}

export function SolutionLargeCard(solution: SolutionLargeCardProps) {
  const difficulty = solution.challenge.difficulty
  const difficultyBadgeColor = getBadgeColorFromChallengeDifficulty(difficulty)

  return (
    <Link
      href={`/solution/${solution.id}`}
      className='block space-y-2 rounded-md border border-gray-500 bg-gray-800/50 p-4 duration-300 hover:border-gray-400/90 hover:bg-gray-800/60'
    >
      <div className='flex items-center justify-between gap-4'>
        <h3 className='truncate text-lg font-semibold'>{solution.title}</h3>
      </div>
      <div className='line-clamp-4'>{solution.description}</div>
      <div className='flex flex-col items-end justify-end gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-wrap items-end justify-end gap-1 text-gray-300 sm:items-center sm:justify-start'>
          <Badge>{solution.challenge.title}</Badge>
          <Badge color='gray'>{solution.challenge.type}</Badge>
          <Badge color={difficultyBadgeColor}>{difficulty}</Badge>
        </div>
        <div className='text-end text-sm text-gray-400'>{formatDistance(solution.updatedAt)}</div>
      </div>
    </Link>
  )
}
