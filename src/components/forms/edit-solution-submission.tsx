'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { useForm, zodResolver } from '@mantine/form'
import { type EditSolutionSubmission, editSolutionSubmissionSchema } from '@/utils/schemas'
import { Button } from '../button/button'
import { Input } from '../input/input'
import { MarkdownInput } from '../input/markdown'
import type { Solution } from '@prisma/client'

interface EditSolutionSubmissionFormProps {
  initialSolution: Solution | null
}

const validate = zodResolver(editSolutionSubmissionSchema)

export function EditSolutionSubmissionForm({ initialSolution }: EditSolutionSubmissionFormProps) {
  const params = useParams()
  const router = useRouter()
  const { trigger, isMutating } = useSWRMutation(
    '/api/solution',
    (url, data: { arg: EditSolutionSubmission }) => axios.post<Solution>(url, data.arg),
    {
      onError: err => toast.error(err?.data?.message ?? 'Something went wrong'),
      onSuccess: res =>
        toast.success('Solution submitted', {
          action: {
            label: 'Go to solution',
            onClick: () => router.push(`/solution/${res.data.id}`),
          },
        }),
    }
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
      <MarkdownInput rows={4} id='description' label='Description (markdown)' {...getInputProps('description')} />
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
