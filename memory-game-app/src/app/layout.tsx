import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from './_components/Header'

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: 'memory game',
  description: 'memory game challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={poppins.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
