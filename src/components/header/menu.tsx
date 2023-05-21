import Image from 'next/image'
import Link from 'next/link'
import { TbCaretDown, TbLogout, TbLayoutDashboard, TbSettings } from 'react-icons/tb'
import { Menu, Transition } from '@headlessui/react'
import { SignOutButton } from '../auth/buttons'

interface HeaderMenuProps {
  profile?: string | null
}

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: TbLayoutDashboard },
  { href: '/settings', label: 'Settings', icon: TbSettings },
]

export function HeaderMenu({ profile }: HeaderMenuProps) {
  return (
    <Menu>
      <Menu.Button className='group flex items-center gap-1'>
        <div className='h-9 w-9 rounded-md bg-gray-500'>
          <Image
            className='rounded-md'
            src={profile ?? '/images/placeholder.jpg'}
            alt='User Profile'
            width={36}
            height={36}
            priority
          />
        </div>
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
            {links.map(({ href, label, icon: Icon }) => (
              <Menu.Item key={href}>
                <Link
                  className='flex w-full items-center rounded-md p-2 text-sm text-gray-200 hover:bg-zinc-500'
                  href={href}
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
