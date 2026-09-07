import { LuCalendarDays, LuMapPin } from 'react-icons/lu'

import { Typography } from '@/components/ui/typography'
import { getCommunityEntries } from '@/lib/markdown'
import { communitySections, type CommunitySection } from '@/settings/community-sections'

export async function CommunitySectionPage({ section, archive = false }: { section: CommunitySection; archive?: boolean }) {
  const details = communitySections[section]
  const entries = await getCommunityEntries(section)
  const visibleEntries = section === 'group-meetings' && !archive ? entries.slice(0, 3) : archive ? entries.slice(3) : entries

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-2 py-14 sm:px-5 sm:py-20 lg:grid-cols-[15rem_1fr]">
      <aside className="border border-primary/20 bg-secondary/45 p-5 lg:sticky lg:top-24 lg:self-start">
        <p className="eyebrow">{details.title}</p>
        <nav className="mt-5 space-y-1" aria-label="Community sections">
          {visibleEntries.map((entry) => <a className="block border-l-2 border-transparent px-3 py-2 text-sm hover:border-primary hover:text-primary" href={`#${entry.slug}`} key={entry.slug}>{entry.title}</a>)}
          {section === 'group-meetings' && !archive && entries.length > 3 && <a className="mt-4 block text-sm font-bold text-primary underline" href="/group-meetings/archive">Meeting archive</a>}
        </nav>
      </aside>
      <div>
        <header className="max-w-3xl space-y-4 border-b border-foreground/20 pb-10">
          <p className="eyebrow">{details.eyebrow}</p>
          <h1 className="display-font text-5xl font-bold leading-none sm:text-7xl">{details.title}</h1>
          <p className="text-lg leading-8 text-muted-foreground">{details.description}</p>
        </header>
        <div className="mt-10 space-y-8">
          {visibleEntries.map((entry) => (
            <article className="border-b border-foreground/15 pb-8" id={entry.slug} key={entry.slug}>
              <h2 className="display-font text-3xl font-semibold">{entry.title}</h2>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {entry.date && <span><LuCalendarDays className="mr-1 inline size-4 text-primary" />{entry.date}</span>}
                {entry.venue && <span><LuMapPin className="mr-1 inline size-4 text-primary" />{entry.venue}</span>}
                {entry.presenter && <span>Presenter: {entry.presenter}</span>}
              </div>
              {entry.description && <p className="mt-4 text-muted-foreground">{entry.description}</p>}
              <Typography><section className="mt-4">{entry.content}</section></Typography>
            </article>
          ))}
          {entries.length === 0 && <p className="text-muted-foreground">No entries yet. Add one Markdown file to <code>contents/{section}/</code>.</p>}
        </div>
      </div>
    </section>
  )
}