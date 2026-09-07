import { notFound } from 'next/navigation'
import { promises as fs } from 'node:fs'
import path from 'node:path'

import { Typography } from '@/components/ui/typography'
import { getTeachingDocument } from '@/lib/markdown'
import { teachingSections } from '@/settings/teaching-navigation'
import { TeachingNav } from '../teaching-nav'

interface TeachingSectionProps {
  params: Promise<{ section: string }>
}

export default async function TeachingSectionPage({ params }: TeachingSectionProps) {
  const { section } = await params
  const document = await getTeachingDocument(section)
  if (!document) notFound()

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-2 py-14 sm:px-5 sm:py-20 lg:grid-cols-[15rem_1fr]">
      <TeachingNav />
      <div>
        <p className="eyebrow">Teaching / {section}</p>
        <Typography><section>{document.content}</section></Typography>
      </div>
    </section>
  )
}

export function generateStaticParams() {
  return teachingSections.map(({ slug }) => ({ section: slug }))
}
