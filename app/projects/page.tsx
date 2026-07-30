import { Card } from '@/components/markdown/card'
import { getProjects } from '@/lib/markdown'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="py-12 px-5 sm:px-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
