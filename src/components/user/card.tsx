import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import { TbMail } from 'react-icons/tb'
import { Avatar } from '../avatar/avatar'
import { Button } from '../button/button'
import type { User } from '@prisma/client'

interface UserCardProps {
  user: User
  editProfileButton?: boolean
}

export function UserCard({ user, editProfileButton }: UserCardProps) {
  return (
    <div className='space-y-3'>
      <Avatar
        containerClassName='mx-auto w-fit rounded-full'
        className='rounded-full'
        src={user.image}
        alt={`${user.username} profile`}
        width={500}
        height={500}
      />
      <div>
        <h1 className='font-bold'>
          <span className='block text-2xl'>{user.name ?? user.username}</span>
          {user.name && <span className='block text-xl text-gray-400'>{user.username}</span>}
        </h1>
      </div>
      <div>
        <div>{user.bio}</div>
      </div>

      {editProfileButton && (
        <div>
          <Button component={Link} href='/settings' className='w-full' variant='secondary'>
            Edit profile
          </Button>
        </div>
      )}

      <ul className='text-gray-300'>
        <li>
          <a
            className='flex items-center gap-2 duration-150 hover:text-white hover:underline'
            href='mailto:iswilljr@gmail.com'
          >
            <TbMail className='text-gray-400' />
            <span>{user.email}</span>
          </a>
        </li>

        {user.twitterUsername && (
          <li>
            <a
              className='flex items-center gap-2 duration-150 hover:text-white hover:underline'
              href={`https://twitter.com/${user.twitterUsername}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <BsTwitter className='text-gray-400' />
              <span>{`@${user.twitterUsername}`}</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
