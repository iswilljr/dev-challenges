interface WithParams<T extends Record<string, string>> {
  params: T
}

interface CategoryParams {
  categoryId: string
}

interface ChallengeParams {
  challengeId: string
}

type CategoryPageParams = WithParams<CategoryParams>
type ChallengePageParams = WithParams<ChallengeParams>
