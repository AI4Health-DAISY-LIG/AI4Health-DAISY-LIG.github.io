import { Card } from '@/components/markdown/card'
import { getProjects } from '@/lib/markdown'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="py-12 px-5 sm:px-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Projects</h1>
      <h2 className="text-4xl font-bold mb-10 text-center">Advancing systems biology through end-to-end Artificial Intelligence</h2>
       <p>Our group develops sophisticated learning architectures to bridge the gap between raw biological data and mechanistic understanding. We specialize in building robust, end-to-end frameworks—from Bayesian inference to reinforcement learning—designed to decode the multi-scale complexity of biological systems.
       </p>
       <p>
       * Data Representation* : Knowledge graphs, ontologies, and relational databases.      </p>
       <p>
       * Advanced Modeling* : Structural learning, statistical modeling, and AI-assisted discovery.      </p>
       <p>
       * Engineering Excellence* : Optimized APIs and high-performance computing pipelines.      </p>
       <p> 
       </p>
       <p>
       *Our scientific engagement* : Open Science • Reproducibility • Explainable AI • Co-design
       </p>
       <p> 
       </p>
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
