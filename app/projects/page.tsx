import { Card } from '@/components/markdown/card'
import { getProjects } from '@/lib/markdown'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="mx-auto max-w-7xl space-y-14 px-2 py-14 sm:px-5 sm:py-20">
      <header className="grid gap-8 border-b border-foreground/20 pb-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow">Research</p>
          <h1 className="display-font text-5xl font-bold leading-none sm:text-7xl">Questions first. Models second.</h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-muted-foreground">
          We develop end-to-end methods that turn complex biomedical data into interpretable
          evidence, from knowledge graphs and data quality to reinforcement learning and discovery.
        </p>
      </header>
      <div className="grid gap-5 border-b border-foreground/20 pb-14 sm:grid-cols-3">
        <div><p className="eyebrow">Data representation</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Knowledge graphs, ontologies, and relational databases.</p></div>
        <div><p className="eyebrow">Advanced modeling</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Structural learning, statistical modeling, and AI-assisted discovery.</p></div>
        <div><p className="eyebrow">Scientific practice</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Open science, reproducibility, explainability, and co-design.</p></div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            href={project.href}
            image={project.image}
            variant="image"
          />
        ))}
      </div>
    </section>
  )
}
