'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { Card, type CardProps } from '../card/card'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../button/button'
import { TbLoader } from 'react-icons/tb'
import { cx } from '@/utils/cx'

const MAX_SELECTED_OFFERS = 10

interface OffersProps {
  initialOffers: CardProps[]
}

export function Offers({ initialOffers }: OffersProps) {
  const params = useParams()
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({})
  const [offers, setOffers] = useState(initialOffers)
  const [page, setPage] = useState(2)
  const {
    data: res,
    isMutating,
    trigger,
  } = useSWRMutation(
    `/api/offers`,
    (url, { arg }: { arg: { type: string; page: number } }) => axios.get(`${url}?type=${arg.type}&page=${arg.page}`),
    {
      onSuccess(res, key, config) {
        setPage(p => ++p)
        setOffers(offers => [...offers, ...res.data])
      },
    }
  )

  return (
    <>
      <section className='mx-auto max-w-7xl px-4'>
        <div className='mt-4 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {offers.map(item => (
            <Card
              key={item.id}
              {...item}
              className={cx('cursor-pointer ring-0 transition', {
                'border-blue-500 ring-2 ring-blue-500': selectedIds[item.id as string],
              })}
              image={item.image ?? '/images/placeholder.jpg'}
              descriptionMaxLines
              onClick={() => {
                const id = item.id as string
                const selectedIdsCount = Object.values(selectedIds).filter(Boolean).length

                if (selectedIdsCount >= MAX_SELECTED_OFFERS && !selectedIds[id]) return

                setSelectedIds(prev => ({ ...prev, [id]: !prev[id] }))
              }}
            />
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
            onClick={() => trigger({ type: params.categoryId, page })}
          >
            Load more offers
          </Button>
        )}
        <Button
          disabled={isMutating}
          className='px-6'
          onClick={() => {
            const values = Object.keys(selectedIds).map(id => offers.find(offer => offer.id === id)?.description)

            console.log(values)
          }}
        >
          Create challenges
        </Button>
      </div>
    </>
  )
}
