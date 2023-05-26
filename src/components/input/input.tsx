'use client'

import { cx } from '@/utils/cx'
import { useRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, Record<string, unknown> {
  id: string
  label: React.ReactNode
  component?: any
  error?: React.ReactNode
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
}

export function Input({ id, label, component, className, error, leftSection, rightSection, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const Component: React.FC<any> = component ?? 'input'

  return (
    <div className='input-root'>
      <label className='pointer-events-none flex items-center text-sm font-medium leading-6 text-gray-200' htmlFor={id}>
        {label}
      </label>
      <div className='relative mt-1'>
        <div
          onClick={() => inputRef.current?.focus()}
          aria-disabled={props.disabled}
          className={cx(
            'form-input flex w-full items-center rounded-md border-0 bg-zinc-800/20 py-1.5 text-gray-200 shadow-sm ring-1 ring-gray-500 duration-150 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-sky-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 sm:text-sm sm:leading-6',
            { 'ring-red-300 focus-within:ring-red-300': error }
          )}
        >
          {leftSection}
          <Component
            ref={inputRef}
            className={cx(
              'h-6 w-full border-none bg-transparent p-0 outline-none focus:outline-none disabled:cursor-not-allowed',
              className
            )}
            id={id}
            name={id}
            {...props}
          />
          {rightSection}
        </div>
        <div
          className={cx('grid grid-rows-[0fr] duration-300 [transition-property:grid-template-rows]', {
            'grid-rows-[1fr]': error,
          })}
        >
          <div className='overflow-hidden'>
            <p className='h-4 pt-1 text-xs text-red-300'>{error}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
