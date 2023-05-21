import { cx } from '@/utils/cx'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
}

export function Skeleton({ animate = false, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      role='status'
      className={cx('h-6 w-full rounded-md bg-gray-500/50', { 'animate-pulse': animate }, props.className)}
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
