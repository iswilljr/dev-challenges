import { z } from 'zod'

export type UpdateProfile = z.infer<typeof updateProfileSchema>

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, 'Should have at least 1 characters'),
  bio: z.string().trim().optional().nullable(),
  website: z.string().trim().url('Enter a valid url').optional().nullable(),
  twitter: z.string().trim().optional().nullable(),
})
