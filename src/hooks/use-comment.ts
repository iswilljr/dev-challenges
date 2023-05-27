'use client'

import { useContext } from 'react'
import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { CommentsContext } from '@/components/comment/provider'
import type { CommentState } from '@/types/comments'

export function useCommentStore() {
  const store = useContext(CommentsContext)

  if (!store) throw new Error('Missing CommentsProvider in the tree')

  return store
}

export function useCommentState<T = CommentState>(selector?: (state: CommentState) => T): T {
  const store = useCommentStore()

  return useStore(store, (selector ?? ((data: CommentState) => data)) as any, shallow)
}
