import { cx } from '@/utils/cx'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label?: React.ReactNode
  data: Value[]
}

export interface Value {
  value: string
  label?: React.ReactNode
}

export function Select({ id, label, data, className, ...props }: SelectProps) {
  return (
    <div className='select-root'>
      {label && (
        <label
          className='pointer-events-none flex items-center text-sm font-medium leading-6 text-gray-200'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        className={cx(
          'form-select mt-0.5 h-9 w-full rounded-md border-0 bg-gray-800/50 px-2 py-1.5 text-sm text-gray-200 ring-1 ring-gray-500 duration-150 focus:outline-none focus:ring-2 focus:ring-sky-600',
          className
        )}
      >
        {data.map(({ label, value }) => (
          <option className='bg-gray-800' key={value} value={value}>
            {label ?? value}
          </option>
        ))}
      </select>
    </div>
  )
}
