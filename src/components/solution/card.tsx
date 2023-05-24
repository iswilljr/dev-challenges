import { Card } from '../card/card'
import { User } from '../user/user'
import type { Solution, User as UserType } from '@prisma/client'

interface SolutionCardProps extends Solution {
  user: UserType
}

export function SolutionCard({ id, title, description, user }: SolutionCardProps) {
  return (
    <Card
      animate
      description={description ?? ''}
      descriptionMaxLines
      href={`/solution/${id}`}
      title={title}
      topSection={<User {...user} />}
    />
  )
}
