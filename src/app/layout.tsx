import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { G8Provider } from '@/lib/state'
import { RouteTransition } from '@/lib/routing'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'G8 - World App',
  description: 'G8 platform with World ID verification',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <G8Provider>
          <RouteTransition route="app" className="min-h-screen">
            {children}
          </RouteTransition>
        </G8Provider>
      </body>
    </html>
  )
}