import { promises as fs } from 'node:fs'
import path from 'node:path'

import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/lib/components'

export async function getGroupMember(section: string, person: string) {
  try {
    const filePath = path.join(process.cwd(), 'contents', 'our-group', section, person, 'index.mdx')
    const source = await fs.readFile(filePath, 'utf8')
    return compileMDX<{ title: string; description?: string; image?: string }>({
      source,
      options: { parseFrontmatter: true },
      components,
    })
  } catch {
    return null
  }
}