import Image from 'next/image'
import Link from 'next/link'
import { cx } from '@/utils/cx'
import { Skeleton } from '../skeleton/skeleton'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bottomSection?: React.ReactNode
  description?: string
  href?: string
  image?: string
  title?: string
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
        {image && title ? (
          <div className='relative h-44 w-full overflow-hidden rounded-md bg-white'>
            <Image
              className={cx('mx-auto object-contain', { 'duration-300 group-hover:scale-110': href })}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              src={image}
              alt={title}
              fill
            />
          </div>
        ) : (
          <Skeleton className='h-44' />
        )}
        {title ? <h3 className='mt-4 text-lg font-semibold text-gray-200'>{title}</h3> : <Skeleton className='mt-4' />}
        <div className='text-md mb-4 mt-2 text-gray-300/90'>
          {description ?? (
            <>
              <Skeleton className='mt-1 h-2' />
              <Skeleton className='mt-1 h-2' />
              <Skeleton className='mt-1 h-2' />
              <Skeleton className='mt-1 h-2' />
              <Skeleton className='mt-1 h-2' />
            </>
          )}
        </div>
      </Component>
    </article>
  )
}
