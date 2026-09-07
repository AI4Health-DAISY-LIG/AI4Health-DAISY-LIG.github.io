import { notFound } from 'next/navigation'

import { Typography } from '@/components/ui/typography'
import { getProject } from '@/lib/markdown'
import { promises as fs } from 'node:fs'
import path from 'node:path'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  return (
    <article className="mx-auto max-w-4xl py-14 sm:py-20">
      <p className="eyebrow">Research project</p>
      <h1 className="display-font mt-4 text-5xl font-bold leading-none sm:text-7xl">{project.frontmatter.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{project.frontmatter.description}</p>
      <div className="mt-10 border-t border-foreground/20 pt-8">
        <Typography><section>{project.content}</section></Typography>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'contents', 'projects')
  const entries = await fs.readdir(projectsDir, { withFileTypes: true })
  return entries.filter((entry) => entry.isDirectory()).map((entry) => ({ slug: entry.name }))
}