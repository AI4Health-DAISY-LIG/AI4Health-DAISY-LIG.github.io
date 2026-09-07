import Link from 'next/link'

import { Settings } from '@/types/settings'

export function Footer() {
  return (
    <footer className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-foreground/20 px-5 py-8 text-sm sm:px-8">
      <p className="items-center">
        &copy; {new Date().getFullYear()}{' '}
        <Link
          aria-label={Settings.name}
          className="font-semibold"
          href="/"
          title={Settings.name}
        >
          {Settings.name}
        </Link>
        .
      </p>
      <p className="text-muted-foreground">AI for health data, built in Grenoble.</p>
    </footer>
  )
}
