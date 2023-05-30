import { type ChallengeType, Difficulty, type Prisma } from '@prisma/client'
import type { JsonChallenge } from './schemas'

function isValueInRange(value: number) {
  return (min: number, max: number) => value >= min && value <= max
}

function getDifficulty(score: number): Difficulty {
  const inRange = isValueInRange(score)

  return inRange(0, 2)
    ? Difficulty.easy
    : inRange(3, 4)
    ? Difficulty.normal
    : inRange(5, 6)
    ? Difficulty.medium
    : inRange(7, 8)
    ? Difficulty.hard
    : Difficulty.extreme
}

export function jsonToChallenge(json: JsonChallenge, type: ChallengeType): Prisma.ChallengeCreateInput {
  return {
    type,
    title: json.title,
    description: json.description,
    difficulty: getDifficulty(json.score),
    requirements: json.appRequirements,
  }
}
