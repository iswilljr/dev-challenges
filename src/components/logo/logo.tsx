import { cx } from '@/utils/cx'
import Link from 'next/link'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  containerClassName?: string
  size?: number | string
  withTitle?: boolean
}

export function Logo({ withTitle = false, size = 24, containerClassName, width, height, ...props }: LogoProps) {
  return (
    <Link href='/' className={cx('flex items-center', containerClassName)}>
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlSpace='preserve'
          width={width ?? size}
          height={height ?? size}
          fill='#0284C7'
          viewBox='0 0 512 512'
          {...props}
        >
          <path d='M256.005 0C114.611 0 0 114.611 0 255.996 0 397.39 114.611 512 256.005 512 397.39 512 512 397.39 512 255.996 512 114.611 397.39 0 256.005 0zm-68.939 203.112c0 .366-.157.689-.436.916l-72.053 53.582 72.053 53.608c.279.192.436.541.436.89v33.07c0 .41-.201.776-.532.968a.97.97 0 0 1-.471.13.917.917 0 0 1-.558-.2L81.734 268.894a1.134 1.134 0 0 1-.445-.898v-20.765c0-.366.174-.706.445-.907l103.771-77.18a.902.902 0 0 1 .558-.192c.174 0 .323.044.471.13.332.183.532.55.532.968v33.062zm51.453 157.292c-.148.445-.514.741-.951.741h-29.006c-.331 0-.628-.175-.82-.472a1.16 1.16 0 0 1-.131-.976l65.87-208.118a.99.99 0 0 1 .942-.724h29.014c.314 0 .628.166.811.454a1.2 1.2 0 0 1 .131.994l-65.86 208.101zm192.175-92.408c0 .357-.156.698-.436.898l-103.771 77.181a.898.898 0 0 1-.558.2c-.166 0-.322-.052-.471-.13a1.103 1.103 0 0 1-.532-.968v-33.062c0-.357.157-.706.436-.898l72.053-53.608-72.053-53.582a1.117 1.117 0 0 1-.436-.906V170.05c0-.418.201-.785.532-.968a.924.924 0 0 1 .471-.13c.201 0 .392.061.558.192l103.771 77.18c.28.201.436.541.436.907v20.765z' />
        </svg>
      </span>
      {withTitle && <span className='ml-1 text-sm font-semibold'>DevChallenges</span>}
    </Link>
  )
}
