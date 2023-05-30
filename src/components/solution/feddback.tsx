'use client'

import { useSession } from 'next-auth/react'
import { useCommentState } from '@/hooks/use-comment'
import { CommentCard } from '../comment/card'
import { CreateCommentForm } from '../forms/create-comment'
import type { Challenge, Solution } from '@prisma/client'

interface SolutionFeedbackProps {
  solution: Solution
  challenge: Challenge
}

export function SolutionFeedback({ challenge, solution }: SolutionFeedbackProps) {
  const { comments, addComment } = useCommentState()
  const { status } = useSession()

  return (
    <div className='!mt-8 space-y-4'>
      <h2 className='text-2xl font-semibold'>Feedback</h2>
      {comments.length > 0 ? (
        <div className='space-y-2'>
          {comments.map(comment => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </div>
      ) : (
        <div className='text-lg text-gray-300'>No feedback comments found</div>
      )}
      {status === 'authenticated' && <CreateCommentForm id={solution.id} onSuccess={addComment} />}
    </div>
  )
}
