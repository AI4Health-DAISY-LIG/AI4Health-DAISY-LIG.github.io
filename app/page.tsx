import { LuArrowUpRight, LuDna, LuGithub, LuMoveDown } from 'react-icons/lu'

import { Link } from '@/lib/transition'
import { GitHubLink } from '@/settings/navigation-constants'

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-20 pt-12 sm:px-5 sm:pt-20">
      <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div className="space-y-8">
          <p className="eyebrow">AI4Health / DAISY / LIGLAB</p>
          <h1 className="display-font max-w-4xl text-5xl font-bold leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">
            Intelligence for <span className="text-primary">living systems.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            We build explainable AI that connects biological data, mechanistic knowledge, and
            real-world health questions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1" href="/projects">
              Explore our research <LuArrowUpRight className="size-4" />
            </Link>
            <Link className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-bold transition-colors hover:bg-foreground hover:text-background" href="/our-group">
              Meet the group
            </Link>
          </div>
        </div>

        <div className="lab-panel relative min-h-80 overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 size-56 rounded-full border-[28px] border-primary/20" />
          <div className="absolute -bottom-24 -left-12 size-48 rounded-full border-[18px] border-accent/70" />
          <div className="relative flex h-full flex-col justify-between gap-12">
            <div className="flex items-center justify-between border-b border-foreground/15 pb-4 text-xs font-bold uppercase tracking-widest">
              <span>Research unit</span>
              <LuDna className="size-6 text-primary" />
            </div>
            <p className="display-font max-w-xs text-3xl font-semibold leading-tight">
              From data representation to discovery.
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs font-bold uppercase tracking-wider">
              <span className="border-t-2 border-primary pt-2">Graphs</span>
              <span className="border-t-2 border-primary pt-2">Models</span>
              <span className="border-t-2 border-primary pt-2">Impact</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid gap-5 border-t border-foreground/20 pt-6 sm:grid-cols-3">
        <div><p className="eyebrow">Focus</p><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Systems biology, biomedical knowledge, and trustworthy machine learning.</p></div>
        <div><p className="eyebrow">Based in</p><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Grenoble Computer Science Laboratory, France.</p></div>
        <div className="flex items-end justify-between sm:justify-end sm:gap-8"><Link className="text-sm font-bold underline underline-offset-4" href={GitHubLink.href} target="_blank">Open science on GitHub <LuGithub className="ml-1 inline size-4" /></Link><LuMoveDown className="hidden size-5 text-primary sm:block" /></div>
      </div>
    </section>
  )
}
