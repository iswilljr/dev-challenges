import Markdown from 'markdown-to-jsx'
import { cx } from '@/utils/cx'

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <Markdown
      options={{
        overrides: {
          script: ({ children }) => (
            <pre>
              <code>{children}</code>
            </pre>
          ),
        },
      }}
      className={cx(
        'prose prose-sm prose-blue min-w-full max-w-full !space-y-4 break-words text-sm text-gray-200 prose-headings:text-gray-100 prose-a:text-blue-300 prose-blockquote:border-gray-500 prose-blockquote:text-gray-400 prose-blockquote:[font-style:normal] prose-code:rounded-sm prose-code:bg-gray-500 prose-code:px-1 prose-code:py-0.5 prose-code:text-white prose-code:before:content-none prose-code:after:content-none prose-code:prose-blockquote:bg-gray-600 prose-code:prose-blockquote:text-gray-300 prose-pre:w-full prose-pre:min-w-full prose-pre:max-w-full prose-code:prose-pre:bg-transparent prose-code:prose-pre:px-0 prose-p:prose-li:mt-0 [&_*]:!mb-0',
        className
      )}
    >
      {content}
    </Markdown>
  )
}
