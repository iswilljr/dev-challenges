interface WithParams<T extends Record<string, string>> {
  params: T
}

interface CategoryParams {
  categoryId: string
}

interface ChallengeParams {
  challengeId: string
}

interface ProfileParams {
  profileId: string
}

interface SolutionParams {
  solutionId: string
}

interface OfferParams {
  offerId: string
}

type CategoryPageParams = WithParams<CategoryParams>
type ChallengePageParams = WithParams<ChallengeParams>
type ProfilePageParams = WithParams<ProfileParams>
type SolutionPageParams = WithParams<SolutionParams>
type OfferPageParams = WithParams<OfferParams>
