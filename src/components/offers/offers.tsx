'use client'

import Link from 'next/link'
import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import { TbAlertTriangle, TbLoader } from 'react-icons/tb'
import { Button } from '../button/button'
import { Modal } from '../modal/modal'
import { Offer } from './offer'
import type { Challenge } from '@prisma/client'
import type { Item } from '@/types/offers'

interface OfferProps {
  initialOffers: Item[]
  initialGeneratedChallenge?: Challenge | null
}

export function Offers({ initialOffers, initialGeneratedChallenge }: OfferProps) {
  const [offers, setOffers] = useState(initialOffers)
  const [page, setPage] = useState(2)
  const {
    data: res,
    isMutating,
    trigger,
  } = useSWRMutation(`/api/offer`, (url, { arg }: { arg: { page: number } }) => axios.get(`${url}?&page=${arg.page}`), {
    onSuccess(res) {
      setPage(p => ++p)
      setOffers(offers => [...offers, ...res.data])
    },
  })

  return (
    <>
      <section>
        <h2 className='text-xl font-semibold'>InfoJobs Offers</h2>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {offers.map(item => (
            <Offer key={item.id} offer={item} />
          ))}
        </div>
      </section>

      {initialGeneratedChallenge && (
        <Modal opened onClose={() => {}}>
          <div className='flex items-center justify-center'>
            <TbAlertTriangle size={100} />
          </div>
          <p className='select-none text-center text-lg'>
            User already has generated a custom challenge.{' '}
            <Link className='text-blue-300' href='/'>
              Head back.
            </Link>
          </p>
        </Modal>
      )}

      <div className='sticky bottom-0 flex w-full items-center justify-center gap-2 border-t border-gray-500 bg-zinc-700 py-4'>
        {(res == null || (res != null && res.data.length !== 0)) && (
          <Button
            disabled={isMutating}
            icon={isMutating && <TbLoader className='animate-spin' />}
            variant='secondary'
            className='px-6'
            onClick={() => trigger({ page })}
          >
            Load more offers
          </Button>
        )}
      </div>
    </>
  )
}
