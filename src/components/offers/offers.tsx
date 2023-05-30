'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import { TbLoader } from 'react-icons/tb'
import { Button } from '../button/button'
import { Offer } from './offer'
import type { Item } from '@/types/offers'

interface OfferProps {
  initialOffers: Item[]
}

export function Offers({ initialOffers }: OfferProps) {
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
