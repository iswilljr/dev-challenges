import { Badge, getBadgeColorFromChallengeDifficulty } from '../badge/badge'
import { Card, type CardProps } from '../card/card'
import { type Challenge, Difficulty } from '@prisma/client'

interface ChallengeCardProps
  extends Challenge,
    Omit<CardProps, 'id' | 'href' | 'title' | 'description' | 'bottomSection'> {}

const difficultyFillNumbers: Record<Difficulty, number> = {
  [Difficulty.easy]: 1,
  [Difficulty.normal]: 2,
  [Difficulty.medium]: 3,
  [Difficulty.hard]: 4,
  [Difficulty.extreme]: 5,
}

export function ChallengeCard({
  createdAt,
  description,
  difficulty,
  id,
  requirements,
  title,
  type,
  updatedAt,
  userId,
  ...cardProps
}: ChallengeCardProps) {
  const fillColor = getBadgeColorFromChallengeDifficulty(difficulty)
  const fillNumber = difficultyFillNumbers[difficulty]
  const fillColorArray = [...Array(fillNumber)]
  const emptyColorArray = [...Array(Object.keys(difficultyFillNumbers).length - fillNumber)]

  return (
    <Card
      {...cardProps}
      href={`/challenge/${id}`}
      title={title ?? ''}
      description={description ?? ''}
      bottomSection={
        <div className='flex flex-1 items-end'>
          <div className='w-full space-y-2 rounded-md bg-gray-600/50 p-2'>
            <div className='text-xs capitalize text-gray-300'>{difficulty}</div>
            <div className='flex items-center gap-1'>
              {fillColorArray.map((_, i) => (
                <Badge key={i} className='flex-1 rounded p-1' color={fillColor} variant='light' />
              ))}
              {emptyColorArray.map((_, i) => (
                <Badge key={i} className='flex-1 rounded bg-gray-600 p-1' />
              ))}
            </div>
          </div>
        </div>
      }
    />
  )
}
