export default function ChallengeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='space-y-4'>
      <div className='space-y-4 rounded-md border border-gray-500 bg-zinc-800/50 p-4 shadow-md'>
        <p>
          <strong className='text-xl font-semibold'>Before submitting</strong>
        </p>
        <ul className='list-inside list-decimal'>
          <li>Make sure you have followed all the instructions</li>
          <li>Have the Live Demo URL and Repo URL</li>
          <li>Try to explain your approach briefly</li>
        </ul>
      </div>
      {children}
    </div>
  )
}
