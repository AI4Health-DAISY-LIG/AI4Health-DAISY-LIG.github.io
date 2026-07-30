import { Card } from '@/components/markdown/card'
import { getNestedContent } from '@/lib/markdown' // Changement d'import

// export default async function ProjectsPage() {
//   const projects = await getProjects()
//
//   return (
//     <section className="py-12 px-5 sm:px-8">
//       <h1 className="text-4xl font-bold mb-10 text-center">Advancing systems biology through end-to-end Artificial Intelligence</h1>
//       <p>Our group develops sophisticated learning architectures to bridge the gap between raw biological data and mechanistic understanding. We specialize in building robust, end-to-end frameworks—from Bayesian inference to reinforcement learning—designed to decode the multi-scale complexity of biological systems.
//       </p>
//       <p>
//       * Data Representation* : Knowledge graphs, ontologies, and relational databases.      </p>
//       <p>
//       * Advanced Modeling* : Structural learning, statistical modeling, and AI-assisted discovery.      </p>
//       <p>
//       * Engineering Excellence* : Optimized APIs and high-performance computing pipelines.      </p>
//       <p> 
//       </p>
//       <p>
//       *Our scientific engagement* : Open Science • Reproducibility • Explainable AI • Co-design
//       </p>
//       <h2 className="text-4xl font-bold mb-10 text-center">Members</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <Card
//             key={project.title}
//             title={project.title}
//             description={project.description}
//             href={project.href}
//             image={project.image}
//           />
//         ))}
//       </div>
//      
//       <h2 className="text-4xl font-bold mb-10 text-center">Students</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <Card
//             key={project.title}
//             title={project.title}
//             description={project.description}
//             href={project.href}
//             image={project.image}
//           />
//         ))}
//       </div>
//      
//       <h2 className="text-4xl font-bold mb-10 text-center">Alumni</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <Card
//             key={project.title}
//             title={project.title}
//             description={project.description}
//             href={project.href}
//             image={project.image}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }


export default async function OurGroupPage() { // Renommé pour la clartage
  const sections = await getNestedContent('contents/our-group')
  const items = sections.flatMap((section) => section.items) // Aplatissement des sections

  return (
    <section className="py-12 px-5 sm:px-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Group</h1> {/* Titre mis à jour */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.href} // Utilisation de href comme clé unique
            title={item.title}
            description={item.description}
            href={item.href}
            image={item.image}
            variant="image"
          />
        ))}
      </div >
    </section>
  )
}
