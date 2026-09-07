import teachingSites from '@/public/search-data/teaching-sites.json'

import { Card } from '@/components/markdown/card'

export default function TeachingPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Teaching</p>
        <h1 className="text-4xl font-bold sm:text-6xl">Learning with AI for health</h1>
        <p className="text-lg text-muted-foreground">
          Courses, practical material, and public learning resources from the AI4Health@DAISY team.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {teachingSites.map((site) => (
          <Card
            key={site.github}
            title={site.title}
            description={site.description}
            href={site.url}
            external
          >
            <a
              className="mt-4 text-sm font-semibold text-primary underline"
              href={site.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              View source on GitHub
            </a>
          </Card>
        ))}
      </div>
    </section>
  )
}