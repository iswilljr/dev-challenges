'use client'

import { useSession } from 'next-auth/react'
import { TbCirclePlus } from 'react-icons/tb'
import { CardSkeleton } from '../card/card'
import { SignInButton } from '../auth/buttons'
import { Button } from '../button/button'
import type { Challenge } from '@prisma/client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CategoriesPanelProps {
  challenges?: Challenge[] | null
}

const skeletonCards = [...Array(3)]

export function Categories({ challenges }: CategoriesPanelProps) {
  return <div>{challenges != null && challenges.length > 0 ? <span>challenges</span> : <CategoriesSkeleton />}</div>
}

function CategoriesSkeleton() {
  const { status } = useSession()
  const params = useParams()

  return (
    <div className='relative w-full'>
      <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {skeletonCards.map((_, i) => (
          <CardSkeleton
            animate={status === 'loading'}
            className='hidden first:inline-grid lg:inline-grid sm:[&:nth-child(2)]:inline-grid'
            key={i}
          />
        ))}
      </div>
      <div className='absolute top-0 grid h-full w-full place-items-center'>
        <div className='grid h-3/4 w-4/5 min-w-[160px] place-items-center rounded-md p-6 drop-shadow-2xl'>
          <div className='absolute left-[10%] top-1/2 h-0 w-4/5 rounded-3xl shadow-[0_0_120px_110px_#3f3f46]' />
          <div className='z-50'>
            {status === 'authenticated' ? (
              <Button
                component={Link}
                href={`/category/${params.categoryId}/create`}
                icon={<TbCirclePlus className='h-4 w-4' />}
                className='text-xs'
                variant='outlined'
              >
                Create challenges for this category
              </Button>
            ) : (
              <SignInButton status={status} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
