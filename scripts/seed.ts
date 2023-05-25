import frameworks from '../.data/challenges/frameworks.json'
import frontend from '../.data/challenges/frontend.json'
import fullstack from '../.data/challenges/fullstack.json'
import responsive from '../.data/challenges/responsive.json'
import { prisma } from '@/utils/prisma'
import { type Prisma, ChallengeType, Difficulty } from '@prisma/client'

type Challenge = Prisma.ChallengeCreateInput
type JsonChallenge = (typeof frameworks | typeof frontend | typeof fullstack | typeof responsive)['challenges'][number]

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

function jsonToChallenge(json: JsonChallenge, type: ChallengeType): Challenge {
  return {
    type,
    title: json.title,
    description: json.description,
    difficulty: getDifficulty(json.score),
    requirements: json.appRequirements,
  }
}

async function createChallenges() {
  const frontendChallenges = frontend.challenges.map(challenge => jsonToChallenge(challenge, ChallengeType.frontend))
  const fullstackChallenges = fullstack.challenges.map(challenge => jsonToChallenge(challenge, ChallengeType.fullstack))
  const frameworkChallenges = frameworks.challenges.map(challenge =>
    jsonToChallenge(challenge, ChallengeType.frameworks)
  )
  const responsiveChallenges = responsive.challenges.map(challenge =>
    jsonToChallenge(challenge, ChallengeType.responsive)
  )

  await prisma.challenge.createMany({
    data: [...frameworkChallenges, ...frontendChallenges, ...fullstackChallenges, ...responsiveChallenges],
  })
}

async function preSeed() {
  await prisma.challenge.deleteMany({})
}

async function seed() {
  await createChallenges()

  console.log('Successfully seed the database')
}

preSeed()
  .then(() => seed())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
