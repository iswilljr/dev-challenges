import { AuthProvider } from '@/components/auth/provider'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { cx } from '@/utils/cx'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dev Challenges',
  description:
    'Web Development Resources that help you to become a Web Developer by working with Real-life projects and practices.',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' className='[color-scheme:dark]'>
      <head>
        <link rel='icon' href='/favicon.svg' />
      </head>
      <body className={cx('bg-zinc-700', inter.className)}>
        <AuthProvider>
          <Header />
          <main className='mx-auto max-w-7xl space-y-8 px-4 py-8'>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
