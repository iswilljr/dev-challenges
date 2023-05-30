'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'
import { type Challenge, ChallengeType } from '@prisma/client'
import { useForm, zodResolver } from '@mantine/form'
import { type GenerateChallenge, generateChallengeSchema } from '@/utils/schemas'
import { Button } from '../button/button'
import { Select } from '../input/select'
import type { Offer } from '@/types/offers'

interface CreateCommentFormProps {
  offer?: Offer
  onCancel?: () => void
  onSuccess: (data: Challenge) => void
}

const validate = zodResolver(generateChallengeSchema)

export function GenerateChallengeForm({ offer, onCancel, onSuccess }: CreateCommentFormProps) {
  const { trigger, isMutating } = useSWRMutation(
    '/api/challenge/generate',
    (url, data: { arg: GenerateChallenge }) => axios.post(url, data.arg),
    {
      onError: err => toast.error(err?.data?.message ?? 'Error generating challenge'),
      onSuccess: res => {
        console.log(res.data)
        onSuccess(res.data)
        toast.success('Challenge successfully generated')
      },
    }
  )

  const { onSubmit, getInputProps } = useForm<GenerateChallenge>({
    initialValues: {
      offerId: offer?.id ?? '',
      type: 'frontend',
    },
    validate,
  })

  return (
    <form className='space-y-4' onSubmit={onSubmit(values => trigger(values).catch(console.error))}>
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
        <Button disabled={isMutating} type='button' variant='secondary' onClick={onCancel}>
          Cancel
        </Button>
        <Button loading={isMutating} type='submit'>
          Create
        </Button>
      </div>
    </form>
  )
}
