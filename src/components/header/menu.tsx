import Link from 'next/link'
import { TbCaretDown, TbLogout, TbLayoutDashboard, TbSettings, TbUser } from 'react-icons/tb'
import { Menu, Transition } from '@headlessui/react'
import { SignOutButton } from '../auth/buttons'
import { Avatar } from '../avatar/avatar'

interface HeaderMenuProps {
  profile: string
  profileImage?: string | null
}

const links = [
  { href: '/profile/:profileId', label: 'Profile', icon: TbUser },
  { href: '/dashboard', label: 'Dashboard', disabled: true, icon: TbLayoutDashboard },
  { href: '/settings', label: 'Settings', icon: TbSettings },
]

export function HeaderMenu({ profile, profileImage }: HeaderMenuProps) {
  return (
    <Menu>
      <Menu.Button className='group flex items-center gap-1'>
        <Avatar src={profileImage} alt='User Profile' width={36} height={36} />
        <TbCaretDown className='fill-gray-500 stroke-gray-500 transition group-hover:fill-gray-300 group-hover:stroke-gray-300 group-[[aria-expanded="true"]]:fill-gray-300 group-[[aria-expanded="true"]]:stroke-gray-300' />
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Menu.Items className='absolute right-0 top-4 w-36 origin-top-right divide-y divide-gray-500 rounded-md border border-gray-500 bg-zinc-600 px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {links.map(({ href, label, disabled, icon: Icon }) => (
              <Menu.Item key={href}>
                <Link
                  aria-disabled={disabled}
                  className='flex w-full items-center rounded-md p-2 text-sm text-gray-200 hover:bg-zinc-500 aria-disabled:pointer-events-none aria-disabled:select-none aria-disabled:opacity-50'
                  href={href.replace(':profileId', profile)}
                >
                  <Icon className='mr-2 h-5 w-5' />
                  {label}
                </Link>
              </Menu.Item>
            ))}
          </div>
          <div className='py-1'>
            <SignOutButton className='flex w-full items-center rounded-md p-2 text-sm text-gray-200 hover:bg-zinc-500'>
              <TbLogout className='mr-2 h-5 w-5' />
              Sign Out
            </SignOutButton>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
