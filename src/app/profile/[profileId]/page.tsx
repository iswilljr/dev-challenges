export const dynamic = 'force-dynamic'

export default function Profile({ params }: ProfilePageParams) {
  return <div>{params.profileId}</div>
}
