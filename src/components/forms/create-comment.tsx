'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { useForm, zodResolver } from '@mantine/form'
import { type CreateComment, createCommentSchema } from '@/utils/schemas'
import { Button } from '../button/button'
import { MarkdownInput } from '../input/markdown'
import type { FullComment, FullCommentReply } from '@/types/comments'

interface CreateCommentFormProps<T extends boolean> {
  id: string
  isReply?: T
  autoFocus?: boolean
  onCancel?: () => void
  onSuccess: (data: T extends true ? FullCommentReply : FullComment) => void
}

const validate = zodResolver(createCommentSchema)

export function CreateCommentForm<T extends boolean = false>({
  id,
  isReply,
  autoFocus,
  onCancel,
  onSuccess,
}: CreateCommentFormProps<T>) {
  const { trigger, isMutating } = useSWRMutation(
    '/api/comment',
    (url, data: { arg: CreateComment }) => axios.post(url, data.arg),
    {
      onError: err => toast.error(err?.data?.message ?? 'Error sending message'),
      onSuccess: res => {
        console.log(res.data)
        onSuccess(res.data)
        toast.success('Comment sent')
      },
    }
  )

  const { onSubmit, getInputProps, isDirty, reset } = useForm<CreateComment>({
    initialValues: {
      id,
      isReply,
      comment: '',
    },
    validate,
  })

  const isInitialState = useMemo(() => !isDirty(), [isDirty])

  return (
    <form className='space-y-4' onSubmit={onSubmit(values => trigger(values).then(reset).catch(console.error))}>
      <MarkdownInput
        autoFocus={autoFocus}
        id='description'
        label={isReply ? 'Reply' : 'Comment'}
        placeholder={isReply ? 'Write your reply' : 'Write your comment'}
        rows={4}
        {...getInputProps('comment')}
      />
      <div className='flex items-center justify-end gap-2'>
        {onCancel && (
          <Button disabled={isMutating} type='button' variant='secondary' onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button disabled={isInitialState} loading={isMutating} type='submit'>
          Send
        </Button>
      </div>
    </form>
  )
}
