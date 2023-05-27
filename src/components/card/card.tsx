import Image from 'next/image'
import Link from 'next/link'
import { cx } from '@/utils/cx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bottomSection?: React.ReactNode
  description?: string
  descriptionClassName?: string
  href?: string
  image?: string
  imageClassName?: string
  title: string
  topSection?: React.ReactNode
}

export function Card({
  bottomSection,
  description,
  descriptionClassName,
  href,
  image,
  imageClassName,
  title,
  topSection,
  className,
  ...props
}: CardProps) {
  const Component: React.FC<any> = (href ? Link : 'div') as any

  return (
    <article
      className={cx(
        'group relative h-full rounded-md border border-gray-500 bg-gray-800/50 pt-4',
        { 'duration-300 hover:border-gray-400/90 hover:bg-gray-800/70': href },
        className
      )}
    >
      {topSection && <div className='mb-2 px-4'>{topSection}</div>}
      <Component className='flex h-full flex-col gap-4 px-4 pb-4' href={href} {...props}>
        {image && (
          <div className={cx('relative h-44 w-full overflow-hidden rounded-md bg-white')}>
            <Image
              className={cx('mx-auto object-contain', { 'duration-300 group-hover:scale-110': href }, imageClassName)}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              src={image}
              alt={title}
              fill
            />
          </div>
        )}
        <div className='space-y-2'>
          <h3 className='line-clamp-2 break-words text-lg font-semibold text-gray-200'>{title}</h3>
          {description && (
            <div className={cx('text-md break-words text-gray-300/90', descriptionClassName)}>{description}</div>
          )}
        </div>
        {bottomSection}
      </Component>
    </article>
  )
}
