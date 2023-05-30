import axios from 'redaxios'
import type { InfoJobsOffersResponse, Offer } from '@/types/offers'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

const infoJobsApi = axios.create({
  baseURL: 'https://api.infojobs.net/api/7',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${infoJobsToken}`,
  },
})

export interface Options {
  page?: number
}

export async function getInfoJobsOffers({ page = 1 }: Options = {}) {
  const res = await infoJobsApi.get<InfoJobsOffersResponse>(
    `/offer?category=informatica-telecomunicaciones&page=${page}`
  )

  const { items } = res.data

  return items ?? []
}

export async function getInfoJobsOfferById(id: string) {
  const res = await infoJobsApi.get<Offer>(`/offer/${id}`)

  return res.data
}
