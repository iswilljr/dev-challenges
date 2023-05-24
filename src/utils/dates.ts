import { formatDistance as dateFormatDistance } from 'date-fns'

export function formatDistance(date: Date) {
  return dateFormatDistance(date, new Date(), { addSuffix: true })
}
