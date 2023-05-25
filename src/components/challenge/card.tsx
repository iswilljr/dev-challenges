import { Card } from '../card/card'
import type { Challenge } from '@prisma/client'

interface ChallengeCardProps extends Challenge {}

export function ChallengeCard({ id, title, description }: ChallengeCardProps) {
  return <Card href={`/challenge/${id}`} title={title ?? ''} description={description ?? ''} />
}
