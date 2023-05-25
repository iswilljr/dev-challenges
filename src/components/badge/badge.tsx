import { cx } from '@/utils/cx'
import { Difficulty } from '@prisma/client'

export type BadgeColor = 'blue' | 'gray' | 'green' | 'purple' | 'red' | 'sky' | 'yellow'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  variant?: 'dark' | 'light'
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

const colorLightClassNames: Record<BadgeColor, string> = {
  blue: 'bg-blue-400',
  gray: 'bg-gray-400',
  green: 'bg-green-400',
  purple: 'bg-purple-400',
  red: 'bg-red-400',
  sky: 'bg-sky-400',
  yellow: 'bg-yellow-400',
}

const variants = {
  dark: colorClassNames,
  light: colorLightClassNames,
}

const difficultyBadgeColors: Record<Difficulty, BadgeColor> = {
  [Difficulty.easy]: 'sky',
  [Difficulty.normal]: 'green',
  [Difficulty.medium]: 'yellow',
  [Difficulty.hard]: 'red',
  [Difficulty.extreme]: 'purple',
}

export function getBadgeColorFromChallengeDifficulty(difficulty: Difficulty) {
  return difficultyBadgeColors[difficulty]
}

export function Badge({ color = 'blue', className, variant = 'dark', ...props }: BadgeProps) {
  const colorClassName = variants[variant][color]

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
