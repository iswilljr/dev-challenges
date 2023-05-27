import Link from 'next/link'
import { BsGlobeAmericas, BsTwitter, BsEnvelopeAt } from 'react-icons/bs'
import { Avatar } from '../avatar/avatar'
import { Button } from '../button/button'
import type { User } from '@prisma/client'
import type { IconType } from 'react-icons'

interface UserCardProps {
  user: User
  editProfileButton?: boolean
}

interface Item {
  href: string
  label?: string
  icon: IconType
}

export function UserCard({ user, editProfileButton }: UserCardProps) {
  const items = [
    {
      href: `mailto:${user.email}`,
      label: user.email,
      icon: BsEnvelopeAt,
    },
    user.website ? { href: user.website, icon: BsGlobeAmericas } : null,
    user.twitterUsername
      ? { href: `https://twitter.com/${user.twitterUsername}`, label: `@${user.twitterUsername}`, icon: BsTwitter }
      : null,
  ].filter((item): item is Item => item != null)

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
          <span className='block break-words text-2xl'>{user.name ?? user.username}</span>
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
        {items.map(item => (
          <li key={item.href}>
            <a
              className='flex items-center gap-2 duration-150 hover:text-white hover:underline'
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
            >
              <item.icon className='h-5 w-5 flex-shrink-0 text-gray-400' />
              <span className='truncate'>{item.label ?? item.href}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
