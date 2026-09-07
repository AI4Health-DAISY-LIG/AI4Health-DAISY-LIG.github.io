import { type MetadataRoute } from 'next/types'

import { Settings } from '@/types/settings'

export const dynamic = 'force-static'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const rules = [
    {
      userAgent: '*',
      allow: '/',
    },
  ]

  return {
    rules,
    sitemap: `${Settings.metadataBase}/sitemap.xml`,
  }
}
