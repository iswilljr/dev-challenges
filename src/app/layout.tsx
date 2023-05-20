import { AuthProvider } from '@/components/auth/provider'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dev Challenges',
  description:
    'Web Development Resources that help you to become a Web Developer by working with Real-life projects and practices.',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
