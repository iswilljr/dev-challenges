import { getUserOrRedirect } from '@/utils/get-user'

export default async function ChallengeFeaturesLayout({
  children,
  params,
}: React.PropsWithChildren<ChallengePageParams>) {
  await getUserOrRedirect({ callbackUrl: `/challenge/${params.challengeId}/edit` })

  return <>{children}</>
}
