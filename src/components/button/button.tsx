import { cx } from '@/utils/cx'

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outlined' | 'danger'
  component?: any
}

export function Button({
  children,
  className,
  component,
  icon,
  variant = 'primary',
  ...props
}: ButtonProps & Record<string, any>) {
  const Component: React.FC<any> = component ?? 'button'

  return (
    <Component
      className={cx(
        'flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:select-none disabled:opacity-50',
        {
          'bg-sky-600 ring-1 ring-sky-700 hover:bg-sky-600/80 focus-visible:outline-sky-600': variant === 'primary',
          'bg-gray-600 ring-1 ring-gray-700 hover:bg-gray-600/80 focus-visible:outline-gray-600':
            variant === 'secondary',
          'bg-transparent text-gray-200 ring-1 ring-gray-300/50 hover:ring-gray-400': variant === 'outlined',
          'bg-rose-600 ring-1 ring-rose-700 hover:bg-rose-600/80 focus-visible:outline-rose-600': variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {icon != null && <span className={cx(children != null && 'mr-2')}>{icon}</span>}
      {children}
    </Component>
  )
}
