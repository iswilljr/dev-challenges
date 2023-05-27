import type { Comment, CommentReply, User } from '@prisma/client'

export type WithCreateUpdateValues<T extends Comment | CommentReply> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: Date | string
  updatedAt: Date | string
}

export interface FullCommentReply extends WithCreateUpdateValues<CommentReply> {
  user: User
}

export interface FullComment extends WithCreateUpdateValues<Comment> {
  user: User
  replies: FullCommentReply[]
}

export interface CommentProps {
  comments: FullComment[]
}

export interface CommentState extends CommentProps {
  addComment: (comment: FullComment) => void
  addReply: (commentId: string, reply: FullCommentReply) => void
}

export type CommentStore = ReturnType<typeof createCommentStore>
export type CommentProviderProps = React.PropsWithChildren<CommentProps>
