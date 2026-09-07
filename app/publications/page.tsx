import publications from '@/public/search-data/publications.json'

interface Publication {
  authors: string
  citationUrl: string
  title: string
  venue: string
  year: number
}

export default function PublicationsPage() {
  const byYear = (publications as Publication[]).reduce<Record<string, Publication[]>>((groups, publication) => {
    const year = String(publication.year)
    groups[year] ||= []
    groups[year].push(publication)
    return groups
  }, {})

  return (
    <section className="mx-auto max-w-5xl space-y-12 px-2 py-14 sm:px-5 sm:py-20">
      <header className="max-w-3xl space-y-4 border-b border-foreground/20 pb-10">
        <p className="eyebrow">Publications</p>
        <h1 className="display-font text-5xl font-bold leading-none sm:text-7xl">Research in the record.</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Publications synchronized from the public Google Scholar profile, with the newest work first.
        </p>
        <a className="text-sm font-bold text-primary underline" href="https://scholar.google.com/citations?user=MwfiidYAAAAJ&hl=en&oi=ao" rel="noopener noreferrer" target="_blank">
          Open Google Scholar profile
        </a>
      </header>
      {Object.keys(byYear).length === 0 ? (
        <p className="text-muted-foreground">Publications will appear after the next scheduled Scholar synchronization.</p>
      ) : (
        Object.entries(byYear).sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => (
          <section className="space-y-5" key={year}>
            <h2 className="display-font border-b border-primary/30 pb-2 text-3xl font-semibold text-primary">{year}</h2>
            <div className="space-y-6">
              {items.map((publication) => (
                <article className="border-b border-foreground/10 pb-5" key={`${year}-${publication.title}`}>
                  <a className="text-xl font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary" href={publication.citationUrl} rel="noopener noreferrer" target="_blank">{publication.title}</a>
                  <p className="mt-2 text-sm text-muted-foreground">{publication.authors}{publication.venue && ` - ${publication.venue}`}</p>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </section>
  )
}