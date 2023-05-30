import { ChallengeType } from '@prisma/client'
import { z } from 'zod'

export type UpdateProfile = z.infer<typeof updateProfileSchema>
export type EditSolutionSubmission = z.infer<typeof editSolutionSubmissionSchema>
export type CreateComment = z.infer<typeof createCommentSchema>
export type GenerateChallenge = z.infer<typeof generateChallengeSchema>
export type JsonChallenge = z.infer<typeof jsonChallengeSchema>
export type GeneratedChallengeResponse = z.infer<typeof generatedChallengeResponseSchema>

export const jsonChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  score: z.number().min(0).max(10),
  appRequirements: z.string().array(),
})

export const generatedChallengeResponseSchema = z.object({
  identifiedTechnologies: z.string().array(),
  challenge: jsonChallengeSchema,
})

export const generateChallengeSchema = z.object({
  offerId: z.string().trim(),
  type: z.enum([ChallengeType.frontend, ChallengeType.fullstack, ChallengeType.responsive]),
})

export const createCommentSchema = z.object({
  id: z.string().trim(),
  comment: z.string().trim().min(3, 'Should have at least 3 characters'),
  isReply: z.boolean().optional(),
})

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, 'Should have at least 1 characters'),
  bio: z.string().trim().optional().nullable(),
  website: z.string().trim().url('Enter a valid url').optional().nullable(),
  twitter: z.string().trim().optional().nullable(),
})

export const editSolutionSubmissionSchema = z.object({
  challengeId: z.string().trim(),
  title: z.string().trim().min(5, 'Title should have at least 5 characters'),
  description: z.string().trim(),
  demoURL: z.string().trim().url('Enter a valid url'),
  repoURL: z.string().trim().url('Enter a valid url'),
})
