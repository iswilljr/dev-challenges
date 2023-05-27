'use client'

import { createStore } from 'zustand'
import { createContext, useRef } from 'react'
import type { CommentProps, CommentProviderProps, CommentState, CommentStore } from '@/types/comments'

export const CommentsContext = createContext<CommentStore | null>(null)

const createCommentStore = (initProps: CommentProps) => {
  return createStore<CommentState>()(set => ({
    ...initProps,
    addComment: comment => set(state => ({ comments: [...state.comments, comment] })),
    addReply(commentId, reply) {
      set(state => {
        const commentIndex = state.comments.findIndex(comment => comment.id === commentId)

        if (commentIndex === -1) return state

        const comment = state.comments[commentIndex]
        const comments = [...state.comments]

        comments[commentIndex] = {
          ...comment,
          replies: [...comment.replies, reply],
        }

        return { comments }
      })
    },
  }))
}

export function CommentsProvider({ children, ...props }: CommentProviderProps) {
  const storeRef = useRef<CommentStore>(createCommentStore(props))

  return <CommentsContext.Provider value={storeRef.current}>{children}</CommentsContext.Provider>
}
