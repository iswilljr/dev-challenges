import { Button } from '../button/button'
import type { Solution } from '@prisma/client'

interface SolutionDemoPreviewProps extends Solution {}

export function SolutionDemoPreview({ demoURL, repoURL, title }: SolutionDemoPreviewProps) {
  return (
    <div className='!mt-4 rounded-md border border-gray-500'>
      <div className='flex items-center justify-between gap-2 rounded-t-md bg-gray-800/50 p-4'>
        <h2 className='text-xl font-semibold'>Preview</h2>
        <div className='flex items-center gap-2'>
          <Button component='a' target='_blank' rel='noopener noreferrer' href={demoURL} variant='secondary'>
            Demo
          </Button>
          <Button component='a' target='_blank' rel='noopener noreferrer' href={repoURL}>
            Code
          </Button>
        </div>
      </div>
      <div className='h-[720px] w-full'>
        <iframe className='h-full w-full' src={demoURL} title={title} />
      </div>
    </div>
  )
}
