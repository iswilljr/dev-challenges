'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { OfferCard } from './card'
import { OfferInfo } from './info'
import { GenerateChallengeForm } from '../forms/generate-challenge'
import { Modal } from '../modal/modal'
import type { Item, Offer as OfferType } from '@/types/offers'

export interface OfferProps {
  offer: Item
}

export function Offer({ offer }: OfferProps) {
  const router = useRouter()
  const {
    data: offerData,
    isMutating,
    error,
    trigger,
  } = useSWRMutation(`/api/offer/${offer.id ?? ''}`, url => axios.get<OfferType>(url).then(res => res.data))
  const [isModalOpened, setModalOpened] = useState(false)
  const [isCreatingChallenge, setCreatingChallenge] = useState(false)

  const canCreateChallenge = useMemo(() => (offerData?.skillsList?.length ?? 0) > 0, [offerData?.skillsList])

  return (
    <>
      <Modal
        opened={isCreatingChallenge}
        onClose={() => {
          setCreatingChallenge(false)
        }}
      >
        <GenerateChallengeForm
          onCancel={() => setCreatingChallenge(false)}
          onSuccess={challenge => router.push(`/challenge/${challenge.id}`)}
          offer={offerData}
        />
      </Modal>
      <Modal
        opened={isModalOpened}
        onClose={() => setModalOpened(false)}
        confirm={canCreateChallenge}
        confirmLabel='Create Challenge'
        onConfirm={() => setCreatingChallenge(true)}
      >
        {isMutating && <p>Loading...</p>}
        {!isMutating && error && !offerData && <p>Error loading the offer</p>}
        {!isMutating && offerData && <OfferInfo offer={offerData} create={canCreateChallenge} />}
      </Modal>
      <OfferCard
        offer={offer}
        onClick={() => {
          if (!offerData) trigger().catch(console.error)
          setModalOpened(true)
        }}
      />
    </>
  )
}
