import { cx } from '@/utils/cx'

export type BadgeColor = 'blue' | 'gray' | 'green' | 'purple' | 'red' | 'sky' | 'yellow'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
}

const colorClassNames: Record<BadgeColor, string> = {
  blue: 'bg-blue-700 text-blue-100',
  gray: 'bg-gray-700 text-gray-100',
  green: 'bg-green-700 text-green-100',
  purple: 'bg-purple-700 text-purple-100',
  red: 'bg-red-700 text-red-100',
  sky: 'bg-sky-700 text-sky-100',
  yellow: 'bg-yellow-700 text-yellow-100',
}

export function Badge({ color = 'blue', className, ...props }: BadgeProps) {
  const colorClassName = colorClassNames[color]

  return (
    <span
      {...props}
      className={cx(
        'inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium capitalize shadow-sm',
        colorClassName,
        className
      )}
    />
  )
}
