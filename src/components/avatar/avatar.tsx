/* eslint-disable jsx-a11y/alt-text */
import Image, { type ImageProps } from 'next/image'
import { cx } from '@/utils/cx'

export interface AvatarProps extends Omit<ImageProps, 'src'> {
  containerClassName?: string
  src?: string | null
}

export function Avatar({ containerClassName, className, src, ...props }: AvatarProps) {
  return (
    <div className={cx('h-9 w-9 rounded-md bg-gray-500', containerClassName)}>
      <Image className={cx('rounded-md', className)} src={src ?? '/images/placeholder.jpg'} priority {...props} />
    </div>
  )
}
