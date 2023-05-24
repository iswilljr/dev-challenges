export const dynamic = 'force-dynamic'

export default function Solution({ params }: SolutionPageParams) {
  return <div>{params.solutionId}</div>
}
