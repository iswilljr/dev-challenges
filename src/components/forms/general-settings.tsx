'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { useForm, zodResolver } from '@mantine/form'
import { Button } from '../button/button'
import { Input } from '../input/input'
import { type UpdateProfile, updateProfileSchema } from '@/utils/schemas'
import type { User } from '@prisma/client'

interface GeneralFormProps {
  user: User
}

const resolver = zodResolver(updateProfileSchema)

export function GeneralForm({ user }: GeneralFormProps) {
  const { trigger, isMutating } = useSWRMutation(
    '/api/profile',
    (url, data: { arg: UpdateProfile }) => axios.post(url, data.arg),
    {
      onError: (err, key, config) => toast.error(err?.data?.message ?? 'Something went wrong'),
      onSuccess: (data, key, config) => toast.success('Profile updated'),
    }
  )
  const { onSubmit, getInputProps, onReset, isDirty } = useForm<UpdateProfile>({
    initialValues: {
      name: user.name ?? '',
      bio: user.bio ?? '',
      website: user.website ?? '',
      twitter: user.twitterUsername ?? '',
    },
    transformValues(values) {
      return {
        ...values,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        website: values.website || null,
      }
    },
    validate(values) {
      const errors = resolver(values)

      return {
        ...errors,
        website: values.website === '' ? null : errors.website,
      }
    },
  })

  const isInitialState = useMemo(() => !isDirty(), [isDirty])

  return (
    <form className='space-y-2' onReset={onReset} onSubmit={onSubmit(values => trigger(values))}>
      <Input id='name' label='Name' {...getInputProps('name')} />
      <Input id='bio' label='Bio' {...getInputProps('bio')} />
      <Input id='website' label='Website' {...getInputProps('website')} />
      <Input
        leftSection={<span className='text-gray-300/80'>https://twitter.com/</span>}
        id='twitter'
        label='Twitter'
        {...getInputProps('twitter')}
      />
      <Input
        leftSection='https://github.com/'
        id='github'
        label='Github'
        defaultValue={user.username ?? ''}
        readOnly
        disabled
      />
      <Input id='email' label='Email' readOnly disabled value={user.email ?? ''} />
      <div className='!mt-4 flex items-center justify-end gap-2'>
        <Button disabled={isInitialState || isMutating} variant='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isInitialState} loading={isMutating} type='submit'>
          Save
        </Button>
      </div>
    </form>
  )
}
