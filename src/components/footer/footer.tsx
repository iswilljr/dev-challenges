import { BsCodeSlash, BsGithub, BsTwitter } from 'react-icons/bs'

export function Footer() {
  return (
    <footer className='z-50 h-10 border-t border-gray-500 bg-zinc-700'>
      <div className='mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 text-gray-300'>
        <div className='text-xs'>{`© ${new Date().getFullYear()} iswilljr`}</div>
        <div className='flex items-center gap-2'>
          <a
            className='hover:text-gray-400'
            href='https://github.com/iswilljr/dev-challenges'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Source code of the project'
          >
            <BsCodeSlash className='h-5 w-5' />
          </a>
          <a
            className='hover:text-gray-400'
            href='https://twitter.com/iswilljr'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='My github profile'
          >
            <BsTwitter className='h-5 w-5' />
          </a>
          <a
            className='hover:text-gray-400'
            href='https://github.com/iswilljr'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='My twitter profile'
          >
            <BsGithub className='h-5 w-5' />
          </a>
        </div>
      </div>
    </footer>
  )
}
