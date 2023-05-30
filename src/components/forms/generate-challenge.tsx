'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import { toast } from 'sonner'
import { type Challenge, ChallengeType } from '@prisma/client'
import { useForm } from '@mantine/form'
import { type GenerateChallenge } from '@/utils/schemas'
import { generateChallenge } from '@/utils/generate'
import { Button } from '../button/button'
import { Select } from '../input/select'
import type { Offer } from '@/types/offers'

interface CreateCommentFormProps {
  offer?: Offer
  onCancel?: () => void
  onSuccess: (data: Challenge) => void
}

export function GenerateChallengeForm({ offer, onCancel, onSuccess }: CreateCommentFormProps) {
  const [loading, setLoading] = useState(false)
  const { trigger, isMutating } = useSWRMutation(
    '/api/challenge/generate',
    (url, data: { arg: GenerateChallenge }) => axios.post(url, data.arg),
    {
      onSuccess: res => {
        onSuccess(res.data)
        toast.success('Challenge successfully generated')
      },
    }
  )

  const { onSubmit, getInputProps } = useForm<Partial<GenerateChallenge>>({
    initialValues: {
      type: 'frontend',
    },
  })

  return (
    <form
      className='space-y-4'
      onSubmit={onSubmit(async values => {
        try {
          if (loading || isMutating) return

          setLoading(true)

          const generatedChallenge = await generateChallenge({ offer, type: values.type })

          await trigger({
            generatedChallenge,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            type: values.type!,
          })
        } catch (err: any) {
          toast.error(err?.data?.message ?? err.message ?? 'Error generating challenge')
        } finally {
          setLoading(false)
        }
      })}
    >
      <Select
        id='type'
        label='Challenge Type'
        data={[
          { value: ChallengeType.frontend, label: 'Frontend' },
          { value: ChallengeType.fullstack, label: 'Fullstack' },
          { value: ChallengeType.responsive, label: 'Responsive' },
        ]}
        {...getInputProps('type')}
      />
      <div className='flex items-center justify-end gap-2'>
        <Button disabled={loading || isMutating} type='button' variant='secondary' onClick={onCancel}>
          Cancel
        </Button>
        <Button loading={loading || isMutating} type='submit'>
          Create
        </Button>
      </div>
    </form>
  )
}
