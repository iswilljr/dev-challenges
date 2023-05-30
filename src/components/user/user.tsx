import Link from 'next/link'
import { cx } from '@/utils/cx'
import { formatDistance } from '@/utils/dates'
import { Avatar } from '../avatar/avatar'
import type { User as UserType } from '@prisma/client'

interface UserProps {
  className?: string
  separatorClassName?: string
  timeAgo?: Date
  timeClassName?: string
  user: UserType
}

export function User({ user, className, separatorClassName, timeAgo, timeClassName }: UserProps) {
  const { name: _name, username, image } = user
  const name = _name ?? username

  return (
    <div className={cx('flex items-center gap-2 [&_a]:max-w-[50%]', className)}>
      <Link className='flex items-center gap-2 hover:underline' href={`/profile/${username}`}>
        <Avatar src={image} alt={`${name} profile`} width={28} height={28} />
        <div className='truncate text-sm font-semibold'>{name}</div>
      </Link>
      {timeAgo && (
        <>
          <span role='separator' className={cx('h-0.5 w-0.5 rounded-full bg-gray-400', separatorClassName)} />
          <div className={cx('flex items-center text-sm text-gray-400', timeClassName)}>
            <time dateTime={timeAgo.toISOString()}>{formatDistance(timeAgo)}</time>
          </div>
        </>
      )}
    </div>
  )
}
