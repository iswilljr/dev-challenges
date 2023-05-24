import { Card } from '../card/card'
import { User } from '../user/user'
import type { Solution as SolutionType, User as UserType } from '@prisma/client'

interface SolutionProps extends SolutionType {
  user: UserType
}

export function Solution({ id, title, description, user }: SolutionProps) {
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
