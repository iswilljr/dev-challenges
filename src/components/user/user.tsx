import Link from 'next/link'
import { Avatar } from '../avatar/avatar'
import type { User as UserType } from '@prisma/client'

interface UserProps extends UserType {}

export function User({ name: _name, username, image }: UserProps) {
  const name = _name ?? username

  return (
    <Link className='flex items-center gap-2 hover:underline' href={`/profile/${username}`}>
      <Avatar src={image} alt={`${name} profile`} width={28} height={28} />
      <div className='truncate text-sm font-semibold'>{name}</div>
    </Link>
  )
}
