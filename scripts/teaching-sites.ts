import { promises as fs } from 'node:fs'
import path from 'node:path'

import { teachingRepositories } from '@/settings/teaching-sites'

interface RepositorySite {
  description: string
  github: string
  title: string
  url: string
}

const outputPath = path.join(process.cwd(), 'public', 'search-data', 'teaching-sites.json')

async function readSite(
  owner: string,
  repo: string,
  fallback: Omit<RepositorySite, 'github'>,
): Promise<RepositorySite> {
  const manifestUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/.github/site.json`
  const response = await fetch(manifestUrl)

  if (!response.ok) {
    console.warn(`Using configured metadata for ${owner}/${repo}: ${response.status}`)
    return { ...fallback, github: `https://github.com/${owner}/${repo}` }
  }

  const manifest = (await response.json()) as Partial<RepositorySite>
  if (!manifest.title || !manifest.description) {
    console.warn(`Using configured metadata for ${owner}/${repo}: incomplete .github/site.json`)
    return { ...fallback, github: `https://github.com/${owner}/${repo}` }
  }

  return {
    title: manifest.title,
    description: manifest.description,
    github: `https://github.com/${owner}/${repo}`,
    url: manifest.url || fallback.url,
  }
}

const sites = await Promise.all(
  teachingRepositories.map(({ owner, repo, title, description, url }) =>
    readSite(owner, repo, { title, description, url }),
  ),
)

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, `${JSON.stringify(sites, null, 2)}\n`)