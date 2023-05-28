import { cx } from '@/utils/cx'
import { formatDistance } from '@/utils/dates'
import { User } from './user'
import type { User as UserType } from '@prisma/client'

interface UserTimeProps {
  user: UserType
  date: Date
  className?: string
  separatorClassName?: string
  timeClassName?: string
}

export function UserTime({ user, date, className, separatorClassName, timeClassName }: UserTimeProps) {
  return (
    <div className={cx('flex items-center gap-2 [&_a]:max-w-[50%]', className)}>
      <User {...user} />
      <span role='separator' className={cx('h-0.5 w-0.5 rounded-full bg-gray-400', separatorClassName)} />
      <div className={cx('flex items-center text-sm text-gray-400', timeClassName)}>
        <time dateTime={date.toISOString()}>{formatDistance(date)}</time>
      </div>
    </div>
  )
}
