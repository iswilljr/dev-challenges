import formatDistanceStrict from 'date-fns/formatDistanceStrict'

export function formatDistance(date: Date) {
  const formatted = formatDistanceStrict(date, new Date(), { addSuffix: true })

  if (/(seconds?)(.+)$/.test(formatted)) return 'less than a minute ago'

  return formatted
}
