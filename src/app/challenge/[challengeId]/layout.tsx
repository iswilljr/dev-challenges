import { categories } from '@/utils/categories'

export async function generateStaticParams() {
  return categories.map(category => ({ challengeId: category.id }))
}

export default function ChallengeLayout({ children }: React.PropsWithChildren) {
  return children
}
