import { cx } from '@/utils/cx'
import { CommentReplyBox } from './reply-box'
import { MarkdownPreview } from '../markdown/preview'
import { User } from '../user/user'
import type { User as UserType } from '@prisma/client'
import type { FullComment } from '@/types/comments'

interface CommentCardProps extends FullComment {}
interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClassName?: string
  content: string
  createdAt: Date | string
  user: UserType
}

export function CommentCard(props: CommentCardProps) {
  return (
    <div
      className='rounded-md border border-gray-500 target:border-transparent target:ring-2 target:ring-sky-600'
      id={`feedback-comment-${props.id}`}
    >
      <Comment
        className='rounded-t-md border-b border-gray-500 bg-gray-800/50 p-4 '
        content={props.content}
        createdAt={props.createdAt}
        user={props.user}
      />
      {props.replies.length > 0 && (
        <div className='space-y-4 border-b border-gray-500 bg-gray-800/50 p-4'>
          {props.replies.map(reply => (
            <Comment
              key={reply.id}
              id={`feedback-reply-${reply.id}`}
              className='relative after:absolute after:left-[13px] after:top-4 after:-z-10 after:h-full after:w-0.5 after:bg-gray-500 after:content-[""]'
              contentClassName='pl-9'
              content={reply.content}
              createdAt={reply.createdAt}
              user={reply.user}
            />
          ))}
        </div>
      )}
      <div className='rounded-b-md px-4 py-2'>
        <CommentReplyBox commentId={props.id} />
      </div>
    </div>
  )
}

function Comment({ className, user, createdAt, contentClassName, content, ...props }: CommentProps) {
  return (
    <div className={cx('space-y-2', className)} {...props}>
      <User user={user} timeAgo={new Date(createdAt)} />
      <MarkdownPreview className={contentClassName} content={content} />
    </div>
  )
}
