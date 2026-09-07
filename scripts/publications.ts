import { promises as fs } from 'node:fs'
import path from 'node:path'

interface Publication {
  authors: string
  citationUrl: string
  title: string
  venue: string
  year: number
}

const scholarUrl = 'https://scholar.google.com/citations?user=MwfiidYAAAAJ&hl=en&oi=ao'
const outputPath = path.join(process.cwd(), 'public', 'search-data', 'publications.json')

function decodeHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function absoluteUrl(value: string) {
  return value.startsWith('http') ? value : `https://scholar.google.com${value}`
}

const previous = await fs.readFile(outputPath, 'utf8').then((value) => JSON.parse(value) as Publication[]).catch(() => [])
try {
  const response = await fetch(scholarUrl, { headers: { 'User-Agent': 'AI4Health-publications-sync/1.0' } })

  if (!response.ok) {
    console.warn(`Google Scholar returned ${response.status}; keeping the previous publication snapshot.`)
  } else {
  const html = await response.text()
  const publications: Publication[] = []
  const entryPattern = /<a(?=[^>]*class="(?:gs_rt|gsc_a_at)")(?=[^>]*href="([^"]+)")[^>]*>([\s\S]*?)<\/a>[\s\S]*?(?:<div class="gs_a">|<div class="gs_gray">)([\s\S]*?)<\/div>(?:[\s\S]*?<div class="gs_gray">([\s\S]*?)<\/div>)?/g
  let match: RegExpExecArray | null

  while ((match = entryPattern.exec(html)) !== null) {
    const citation = absoluteUrl(decodeHtml(match[1]))
    const title = decodeHtml(match[2])
    const metadata = decodeHtml(`${match[3]} ${match[4] || ''}`).replace(/\s+/g, ' ')
    const yearMatch = metadata.match(/(?:,|\s)(20\d{2})(?:\s|,|$)/)
    if (!yearMatch) continue
    const year = Number(yearMatch[1])
    const separator = metadata.indexOf(' - ')
    publications.push({
      authors: separator >= 0 ? metadata.slice(0, separator) : metadata,
      citationUrl: citation,
      title,
      venue: separator >= 0 ? metadata.slice(separator + 3).replace(/,?\s*20\d{2}.*$/, '') : '',
      year,
    })
  }

    if (publications.length > 0) {
      previous.splice(0, previous.length, ...publications)
    } else {
      console.warn('No publications were parsed; keeping the previous publication snapshot.')
    }
  }
} catch (error) {
  console.warn(`Could not fetch Google Scholar; keeping the previous publication snapshot. ${error}`)
}

previous.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, `${JSON.stringify(previous, null, 2)}\n`)
console.log(`Wrote ${previous.length} publications to ${outputPath}`)
