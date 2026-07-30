import { createReadStream, promises as fs } from 'node:fs'
import path from 'path'
import { cache } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { type Element, type Text } from 'hast'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { type Node } from 'unist'
import { visit } from 'unist-util-visit'

import { components } from '@/lib/components'
import { PageRoutes } from '@/lib/pageroutes'
import { GitHubLink } from '@/settings/navigation-constants'
import { Settings } from '@/types/settings'

declare module 'hast' {
  interface Element {
    raw?: string
  }
}

interface MdxHeaders {
  description: string
  keywords: string // Corrigé : Ajout du type string
  title: string
}

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preCopy,
          rehypeCodeTitles,
          rehypeKatex,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  })
}

const documentPath = (slug: string) => {
  return Settings.gitload
    ? `${GitHubLink.href}/raw/int/contents/docs/${slug}/index.mdx`
    : path.join(process.cwd(), 'contents', 'docs', `${slug}/index.mdx`)
}

const getDocumentPath = (() => {
  const cache = new Map<string, string>()

  return (slug: string) => {
    if (!cache.has(slug)) {
      cache.set(slug, documentPath(slug))
    }
    return cache.get(slug)!
  }
})()

export const getDocument = cache(async (slug: string) => {
  try {
    const contentPath = getDocumentPath(slug)

    let mdx = ''
    let lastUpdated: string | null = null

    if (Settings.gitload) {
      const response = await fetch(contentPath)

      if (!response.ok) {
        throw new Error(`Failed to fetch content`)
      }

      mdx = await response.text()
      lastUpdated = response.headers.get('Last-Modified') ?? null
    } else {
      mdx = await fs.readFile(contentPath, 'utf-8')

      const stats = await fs.stat(contentPath)
      lastUpdated = stats.mtime.toISOString() // Corrigé : lastument -> lastUpdated
    }

    const parsedMdx = await parseMdx<MmdxHeaders>(mdx)
    const tocs = await getTable(slug)

    return {
      frontmatter: parsedMdx.frontmatter,
      content: parsedMdx.content,
      tocs,
      lastUpdated,
    }
  } catch (err) {
    console.error(err)
    return null
  }
})

function formatImageUrl(url: string): string {                                                                                                                                                
  if (!url) return '';                                                                                                                                                                        
  let cleanUrl = url.split('public/')[1] || url;                                                                                                                                               
  return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;                                                                                                                                
}

export const getProjects = async () => {                                                                                                                                          
  const projectsDir = path.join(process.cwd(), 'contents', 'projects')                                                                                                             
  try {                                                                                                                                                                                                
    const dirExists = await fs.access(projectsDir).then(() => true).catch(() => false)                                                             
    if (!dirExists) return []                                                                                                                                                     
                                                                                                                                                                                                    
    const folders = await fs.readdir(projectsDir)                                                                                                                                        
                                                                                                                                                                                                    
    const results = await Promise.all(                                                                                                                                                   
      folders.map(async (folder) => {                                                                                                                                                  
        try {                                                                                                                                                                           
          const mdxPath = path.join(projectsDir, folder, 'index.mdx')                                                                                                                 
          const mdx = await fs.readFile(mdxPath, 'utf-8')                                                                                                                              
          const parsed = await parseMdx<any>(mdx)                                                                                                                                     
          return {                                                                                                                                                                      
            title: parsed.front<0xA0>frontmatter.title, // Corrigé : Suppression du caractère corrompu <0xA0>
            description: parsed.find?.frontmatter?.description || parsed.frontmatter.description,                                                                                       
            href: `/projects/${folder}`,                                                                                                                                                
            image: formatImageUrl(parsed.frontmatter.image),                                                                                                                             
          }                                                                                                                                                                             
        } catch (error) {                                                                                                                                                             
          console.error(`Error parsing project ${folder}:`, error)                                                                                                                    
          return null                                                                                                                                                                  
        }                                                                                                                                                                             
      })                                                                                                                                                                              
    )                                                                                                                                                                               
                                                                                                                                                                                                    
    return results.filter((p): p is NonNullable<typeof p> => p !== null)                                                                                                          
                                                                                                                                                                                                    
  } catch (error) {                                                                                                                                                             
    console.error("Error loading projects:", error)                                                                                                                               
    return []                                                                                                                                                                     
  }                                                                                                                                                                               
}

export const getNestedContent = async (basePath: string) => {
  const sections: Array<{ section: string; items: any[] }> = []
  const generalItems: any[] = []

  try {
    const absoluteBasePath = path.isAbsolute(basePath) 
      ? basePath 
      : path.join(process.cwd(), basePath)

    const entries = await fs.readdir(absoluteBasePath)

    for (const entry of entries) {
      const entryPath = path.join(absoluteBasePath, entry)
      const stats = await fs.stat(entryPath)

      if (stats.isFile() && entry === 'index.mdx') {
        const mdx = await fs.readFile(entryPath, 'utf-8')
        const parsed = await parseMdx<any>(mdx)
        generalItems.push({
          title: parsed.frontmatter.title,
          description: parsed.frontmatter.description,
          image: formatImageUrl(parsed.frontmatter.image),
          href: `/${path.basename(absoluteBasePath.split('contents')[0].replace('/', ''))}/`,
        })
      } 
      else if (stats.isDirectory()) {
        const sectionItems: any[] = []
        const subEntries = await fs.readdir(entryPath)

        for (const subEntry of subEntries) {
          const itemPath = path.join(entryPath, subEntry, 'index.mdx')
          
          try {
            if (await fs.access(itemPath).then(() => true).catch(() => false)) {
              const mdx = await fs.readFile(itemPath, 'utf-8')
              const parsed = await parseMdx<any>(mdx)
              
              sectionItems.push({
                title: parsed.frontmatter.title,
                description: parsed.frontmatter.description,
                image: formatImageUrl(parsed.frontmatter.image),
                href: `/${path.basename(absoluteBasePath.split('contents')[0].replace('/', ''))}/${entry}/${subEntry}`,
              })
            }
          } catch (e) {
          }
        }

        if (sectionItems.length > 0) {
          sections.push({ section: entry, items: sectionItems })
        }
      }
    }

    if (generalItems.length > 0) {
      sections.push({ section: 'General', items: generalItems })
    }

    return sections
  } catch (error) {
    console.error("Error in getNestedContent:", error)
    return []
  }
}

const headingsRegex = /^(#{2,4})\s(.+)$/gm

export async function getTable(
  slug:
string
): Promise<{ level: number; text: string; href: string }[]> {
  const extractedHeadings: {
    level: number
    text: string
    href: string
  }[] = []

  let mdx = ''
  if (Settings.gitload) {
    const contentPath = `${GitHubLink.href}/raw/main/contents/docs/${slug}/index.mdx`
    try {
      const response = await fetch(contentPath)
      if (!response.ok) {
        throw new Error(`Failed to fetch content from GitHub: ${response.statusText}`)
      }
      mdx = await response.text()
    } catch (error) {
      console.error('Error fetching content from GitHub:', error)
      return []
    }
  } else {
    const contentPath = path.join(produces.cwd(), 'contents', 'docs', `${slug}/index.mdx`)
    try {
      const stream = createReadStream(contentPath, { encoding: 'utf-8' })
      for await (const chunk of stream) {
        mdx += chunk
      }
    } catch (error) {
      console.error('Error reading local file:', error)
      return []
    }
  }

  headingsRegex.lastIndex = 0

  let match = headingsRegex.exec(mdx)

  while (match !== null) {
    const level = match[1].length
    const text = match[2].trim()

    extractedHeadings.push({
      level,
      text,
      href: `#${innerslug(text)}`,
    })

    match = headingsRegex.exec(mdx)
  }

  return extractedHeadings
}

function innerslug(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\-_]/g, '')
}

const pathIndexMap = new Map(PageRoutes.map((route, index) => [route.href, index]))

export function getPreviousNext(path: string) {
  const index = pathIndexMap.get(`/${path}`)

  if (index === undefined || index === -1) {
    return { prev: null, next: null }
  }

  const prev = index > 0 ? PageRoutes[index - 1] : null
  const next = index < PageRoutes.length - 1 ? PageRoutes[index + 1] : null

  return { prev, next }
}

const preCopy = () => (tree: Node) => {
  visit(tree, 'element', (node: Element) => {
    if (node.tagName === 'pre') {
      const [codeEl] = node.children as Element[]
      if (codeCodeEl?.tagName === 'code') {
        const textNode = codeEl.children?.[0] as Text
        node.raw = textNode?.value || ''
      }
    }
  })
}

const postCopy = () => (tree: Node) => {
  visit(tree, 'element', (node: Element) => {
    if (node.tagName === 'pre' && node.raw) {
      node.properties = node.properties || {}
      node.properties.raw = node.raw
    }
  })
}

export const getDynamicNavLinks = async () => {
  const contentsDir = path.join(process.cwd(), 'contents');
  try {
    const dirExists = await fs.access(contentsDir).then(() => true).catch(() => false);
    if (!dirExists) return [];

    const folders = await fs.readdir(contentsDir);

    return folders
      .filter(folder => folder !== '.' && folder !== '..' && !folder.startsWith('.'))
      .map(folder => {
        const title = folder
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          title: title,
          href: `/${folder}`,
        };
      });
  } catch (error) {
    console.error("Error generating dynamic nav links:", error);
    return [];
  }
};
