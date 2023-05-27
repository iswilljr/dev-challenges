'use client'

import TextareaAutosize from 'react-textarea-autosize'
import { useState } from 'react'
import { Button } from '../button/button'
import { Input, type InputProps } from './input'
import { cx } from '@/utils/cx'
import { MarkdownPreview } from '../markdown/preview'

export interface MarkdownInputProps extends InputProps {}

export function MarkdownInput({ label, ...props }: MarkdownInputProps) {
  const [selected, setSelected] = useState<'input' | 'preview'>('input')

  return (
    <div
      className={cx('[&_.input-root>div]:!mt-0', {
        '[&_.form-input_textarea]:hidden': selected !== 'input',
        '[&_.form-input]:rounded-tl-none': selected === 'input',
      })}
    >
      <Input
        component={TextareaAutosize}
        className='h-auto resize-none'
        minRows={4}
        maxRows={15}
        leftSection={
          selected === 'preview' && <MarkdownPreview className='py-4' content={props.value?.toString() ?? ''} />
        }
        label={
          <>
            <span>
              <Button
                className={cx(
                  'pointer-events-auto mb-0.5 rounded-b-none rounded-t-sm duration-150 hover:ring-gray-300/50',
                  {
                    'text-gray-400 ring-transparent hover:text-gray-200 hover:ring-transparent': selected !== 'input',
                  }
                )}
                variant='outlined'
                type='button'
                onClick={() => setSelected('input')}
              >
                {label}
              </Button>
            </span>
            <span>
              <Button
                disabled={!props.value}
                className={cx(
                  'pointer-events-auto mb-0.5 rounded-b-none rounded-t-sm duration-150 hover:ring-gray-300/50',
                  {
                    'text-gray-300 ring-transparent hover:text-gray-200 hover:ring-transparent': selected !== 'preview',
                  }
                )}
                variant='outlined'
                type='button'
                onClick={() => setSelected('preview')}
              >
                Preview
              </Button>
            </span>
          </>
        }
        {...props}
      />
    </div>
  )
}
