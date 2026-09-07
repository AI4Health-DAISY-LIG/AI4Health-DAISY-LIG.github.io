import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { DM_Sans, Space_Grotesk } from 'next/font/google'

import { Footer } from '@/components/navigation/footer'
import { Navbar } from '@/components/navigation/navbar'
import { Providers } from '@/providers'
import { Settings } from '@/types/settings'
import { getNavigations } from '@/settings/navigation'

import '@/styles/globals.css'

const dmSans = DM_Sans({
  adjustFontFallback: true,
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const spaceGrotesk = Space_Grotesk({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const baseUrl = Settings.metadataBase

export const metadata: Metadata = {
  title: Settings.title,
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  metadataBase: new URL(baseUrl),
  description: Settings.description,
  keywords: Settings.keywords,
  openGraph: {
    type: Settings.openGraph.type,
    url: baseUrl,
    title: Settings.openGraph.title,
    description: Settings.openGraph.description,
    siteName: Settings.openGraph.siteName,
    images: Settings.openGraph.images.map((image) => ({
      ...image,
      url: `${baseUrl}${image.url}`,
    })),
  },
  twitter: {
    card: Settings.twitter.card,
    title: Settings.twitter.title,
    description: Settings.twitter.description,
    site: Settings.twitter.site,
    images: Settings.twitter.images.map((image) => ({
      ...image,
      url: `${baseUrl}${image.url}`,
    })),
  },
  publisher: Settings.name,
  alternates: {
    canonical: baseUrl,
  },
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const navLinks = await getNavigations();

  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} font-regular antialiased`}>
        <Providers>
          <Navbar navLinks={navLinks} />
          <main className="h-auto px-5 sm:px-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
