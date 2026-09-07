import { notFound } from 'next/navigation'
import Image from 'next/image'
import { promises as fs } from 'node:fs'
import path from 'node:path'

import { Typography } from '@/components/ui/typography'
import { getGroupMember } from '@/lib/group'

interface MemberPageProps {
  params: Promise<{ person: string; section: string }>
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { person, section } = await params
  const member = await getGroupMember(section, person)
  if (!member) notFound()

  return (
    <article className="mx-auto max-w-4xl py-14 sm:py-20">
      <p className="eyebrow">The group</p>
      {member.frontmatter.image && <Image alt={String(member.frontmatter.title)} className="mt-6 h-64 w-64 object-cover" height={512} src={`/${String(member.frontmatter.image).replace(/^\//, '')}`} width={512} />}
      <h1 className="display-font mt-4 text-5xl font-bold leading-none sm:text-7xl">{String(member.frontmatter.title)}</h1>
      <p className="mt-6 text-lg text-muted-foreground">{member.frontmatter.description && String(member.frontmatter.description)}</p>
      <div className="mt-10 border-t border-foreground/20 pt-8"><Typography><section>{member.content}</section></Typography></div>
    </article>
  )
}

export async function generateStaticParams() {
  const root = path.join(process.cwd(), 'contents', 'our-group')
  const sections = await fs.readdir(root, { withFileTypes: true })
  const params: { person: string; section: string }[] = []
  for (const section of sections.filter((entry) => entry.isDirectory())) {
    const people = await fs.readdir(path.join(root, section.name), { withFileTypes: true })
    params.push(...people.filter((person) => person.isDirectory()).map((person) => ({ person: person.name, section: section.name })))
  }
  return params
}