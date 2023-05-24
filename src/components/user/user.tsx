import Link from 'next/link'
import { Avatar } from '../avatar/avatar'

interface UserProps {
  name: string
  profile: string
  profileImage?: string | null
}

export function User({ name, profile, profileImage }: UserProps) {
  return (
    <Link className='flex items-center gap-2 hover:underline' href={`/profile/${profile}`}>
      <Avatar src={profileImage} alt={`${name} profile`} width={28} height={28} />
      <div className='text-sm font-semibold'>{name}</div>
    </Link>
  )
}
