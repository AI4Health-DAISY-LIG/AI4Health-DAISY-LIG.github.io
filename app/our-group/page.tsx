import { Card } from '@/components/markdown/card'
import { getNestedContent } from '@/lib/markdown' 

export default async function OurGroupPage() { 
  const sections = await getNestedContent('contents/our-group')

  // Fonction pour transformer "1-members" -> "Members"
  const formatSectionTitle = (title: string) => {
    return title
      .replace(/^[\d\s.-]+/, '') // Supprime les chiffres, points et tirets au début
      .replace(/-/g, ' ')       // Remplace les tirets restants par des espaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <section className="py-12 px-5 sm:px-8 space-y-16">
      <h1 className="text-4xl font-bold text-center">Our Group</h1> 

      {sections.map((section) => {
        const sectionTitle = formatSectionTitle(section.section)
        
        // On ne rend la section que si elle contient des membres
        if (section.items.length === 0) return null

        return (
          <div key={section.section} className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2 text-primary">
              {sectionTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <Card
                  key={item.href}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  image={item.image}
                  variant="image"
                />
              ))}
            </div >
          </div>
        )
      })}
    </section>
  )
}
