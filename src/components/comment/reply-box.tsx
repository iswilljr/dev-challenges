'use client'

import { useCallback, useState } from 'react'
import { useCommentState } from '@/hooks/use-comment'
import { CreateCommentForm } from '../forms/create-comment'
import { Input } from '../input/input'
import type { FullCommentReply } from '@/types/comments'

interface CommentReplyBoxProps {
  commentId: string
}

export function CommentReplyBox({ commentId }: CommentReplyBoxProps) {
  const [showForm, setShowForm] = useState(false)
  const addReply = useCommentState(state => state.addReply)

  const onSuccess = useCallback(
    (reply: FullCommentReply) => {
      addReply(commentId, reply)
    },
    [commentId, addReply]
  )

  return showForm ? (
    <CreateCommentForm id={commentId} onSuccess={onSuccess} onCancel={() => setShowForm(false)} autoFocus isReply />
  ) : (
    <Input id='reply' placeholder='Write your reply' onFocus={() => setShowForm(true)} />
  )
}
