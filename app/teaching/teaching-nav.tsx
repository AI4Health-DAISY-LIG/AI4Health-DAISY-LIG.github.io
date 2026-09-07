'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { teachingSections } from '@/settings/teaching-navigation'

export function TeachingNav() {
  const pathname = usePathname()

  return (
    <aside className="border border-primary/20 bg-secondary/45 p-5 lg:sticky lg:top-24 lg:self-start">
      <p className="eyebrow">Teaching index</p>
      <nav className="mt-5 space-y-1" aria-label="Teaching sections">
        {teachingSections.map((section) => (
          <div key={section.slug}>
            <Link
              className={`block border-l-2 px-3 py-2 text-sm font-bold transition-colors ${pathname === `/teaching/${section.slug}` ? 'border-primary bg-primary text-primary-foreground' : 'border-transparent hover:border-primary hover:text-primary'}`}
              href={`/teaching/${section.slug}`}
            >
              {section.title}
            </Link>
            <ul className="ml-5 space-y-1 py-2 text-xs text-muted-foreground">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
