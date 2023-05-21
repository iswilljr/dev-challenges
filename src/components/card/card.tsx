import Image from 'next/image'
import Link from 'next/link'
import { cx } from '@/utils/cx'
import { Skeleton } from '../skeleton/skeleton'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bottomSection?: React.ReactNode
  description: string
  href?: string
  image: string
  title: string
}

export interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
}

export function Card({ description, href, image, title, className, ...props }: CardProps) {
  const Component: React.FC<any> = (href ? Link : 'div') as any

  return (
    <article className='h-full'>
      <Component
        className={cx(
          'group block h-full rounded-md border border-gray-500 bg-zinc-800/50 p-4',
          { 'duration-300 hover:border-gray-400/90 hover:bg-zinc-800/70': href },
          className
        )}
        href={href}
        {...props}
      >
        <div className='relative h-44 w-full overflow-hidden rounded-md bg-white'>
          <Image
            className={cx('mx-auto object-contain', { 'duration-300 group-hover:scale-110': href })}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={image}
            alt={title}
            fill
          />
        </div>
        <h3 className='mt-4 text-lg font-semibold text-gray-200'>{title}</h3>
        <div className='text-md mb-4 mt-2 text-gray-300/90'>{description}</div>
      </Component>
    </article>
  )
}

export function CardSkeleton({ animate, ...props }: CardSkeletonProps) {
  const animateClass = animate && 'animate-pulse'

  return (
    <div
      {...props}
      role='status'
      className={cx('group block h-full rounded-md border border-gray-500 bg-zinc-800/50 p-4', props.className)}
    >
      <Skeleton className={cx('h-44', animateClass)} />
      <Skeleton className={cx('mt-4', animateClass)} />
      <div className='text-md mt-2 text-gray-300/90'>
        <Skeleton className={cx('mt-1 h-2', animateClass)} />
        <Skeleton className={cx('mt-1 h-2', animateClass)} />
        <Skeleton className={cx('mt-1 h-2', animateClass)} />
        <Skeleton className={cx('mt-1 h-2', animateClass)} />
        <Skeleton className={cx('mt-1 h-2', animateClass)} />
      </div>
    </div>
  )
}
