import { Card } from '@/components/markdown/card'
import { getNestedContent } from '@/lib/markdown' 


export default async function OurGroupPage() { 
  const sections = await getNestedContent('contents/our-group')
  const items = sections.flatMap((section) => section.items) 

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
