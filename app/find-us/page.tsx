export default function FindUsPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-10 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
        <h1 className="text-4xl font-bold sm:text-6xl">Find AI4Health@DAISY</h1>
        <p className="text-lg text-muted-foreground">
          We welcome collaborations with researchers, engineers, and biomedical professionals.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p>
            Tell us about a data source, biological question, or project where AI could help make
            health research more understandable and reusable.
          </p>
          <a className="font-semibold text-primary underline" href="mailto:sandrine.muller@univ-grenoble-alpes.fr">
            sandrine.muller@univ-grenoble-alpes.fr
          </a>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Visit LIGLAB</h2>
          <address className="not-italic leading-7 text-muted-foreground">
            Laboratoire d'Informatique de Grenoble (LIG)
            <br />
            Office 303, 700 Avenue Centrale
            <br />
            38401 Saint-Martin-d'Heres, France
          </address>
        </div>
      </div>
      <iframe
        className="h-96 w-full border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2811.8172375578383!2d5.764789711875912!3d45.190795751518415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af50837597d0d%3A0x7089f5efffec5353!2sGrenoble%20Computer%20Science%20Laboratory%20-%20LIGLAB!5e0!0!3m2!1sen!2sfr!4v1745851827454!5m2!1sen!2sfr"
        title="Map showing LIGLAB in Grenoble"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}