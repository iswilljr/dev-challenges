'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { useForm, zodResolver } from '@mantine/form'
import { type EditSolutionSubmission, editSolutionSubmissionSchema } from '@/utils/schemas'
import { Button } from '../button/button'
import { Input } from '../input/input'
import type { Solution } from '@prisma/client'

interface EditSolutionSubmissionFormProps {
  initialSolution: Solution | null
}

const validate = zodResolver(editSolutionSubmissionSchema)

export function EditSolutionSubmissionForm({ initialSolution }: EditSolutionSubmissionFormProps) {
  const params = useParams()
  const { trigger, isMutating } = useSWRMutation('/api/solution', (url, data: { arg: EditSolutionSubmission }) =>
    axios.post(url, data.arg)
  )
  const { onSubmit, getInputProps, onReset, isDirty } = useForm<EditSolutionSubmission>({
    initialValues: {
      challengeId: params.challengeId,
      title: initialSolution?.title ?? '',
      description: initialSolution?.description ?? '',
      demoURL: initialSolution?.demoURL ?? '',
      repoURL: initialSolution?.repoURL ?? '',
    },
    validate,
  })

  const isInitialState = useMemo(() => !isDirty(), [isDirty])

  return (
    <form className='space-y-2' onReset={onReset} onSubmit={onSubmit(values => trigger(values))}>
      <Input id='title' label='Title' {...getInputProps('title')} />
      <Input
        rows={4}
        id='description'
        label='Description'
        component='textarea'
        className='h-auto resize-none'
        {...getInputProps('description')}
      />
      <Input id='demoURL' label='Demo URL' {...getInputProps('demoURL')} />
      <Input id='repoURL' label='Repository URL' {...getInputProps('repoURL')} />
      <div className='!mt-4 flex items-center justify-end gap-2'>
        <Button disabled={isInitialState} loading={isMutating} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  )
}