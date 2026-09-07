import { Card } from '@/components/markdown/card'
import Image from 'next/image'
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
    <section className="mx-auto max-w-7xl space-y-16 px-2 py-14 sm:px-5 sm:py-20">
      <header className="grid gap-8 border-b border-foreground/20 pb-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow">People</p>
          <h1 className="display-font text-5xl font-bold leading-none sm:text-7xl">The people behind the work.</h1>
        </div>
        <div className="space-y-5">
          <Image
            alt="AI4Health@DAISY group outside LIGLAB"
            className="h-64 w-full object-cover object-center"
            height={500}
            priority
            src="/images/people/our-group.jpeg"
            width={900}
          />
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            AI4Health@DAISY brings together researchers and students who care about useful,
            explainable systems for health and biology.
          </p>
        </div>
      </header>

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
