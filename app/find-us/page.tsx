import { buttonVariants } from '@/components/ui/button'
import { PageRoutes } from '@/lib/pageroutes'
import { Link } from '@/lib/transition'

export default function Home() {
  return (
    <section className="flex min-h-[86.5vh] flex-col items-center justify-center px-2 py-8 text-center">
      <h1 className="mb-4 text-4xl font-bold sm:text-7xl">AI4Health</h1>
      <p className="mb-8 max-w-150 text-foreground sm:text-base">
        Advancing Systems Biology through end-to-end Artificial Intelligence to better suit real health data challenges. 
        @DAISY team, LIGLAB, Grenoble, France
      </p>
      <h2> Contact us!</h2>
      <p>Are you a professional in the biomedical field? A researcher or an engineer interested in developing new data sources or improving existing ones? 
        If so, we would love to hear from you! We are always looking for people who want to collaborate on projects that will help us improve our research and make it more accessible to others.</p>
      <h2 className="mb-4 text-4xl font-bold sm:text-7xl">Visit the LIGLAB</h2>
      <p>
        LIG - Laboratoire d’Informatique de Grenoble 
        sandrine.muller [at] univ-grenoble-alpes.fr 
        Office 303 (third floor) 
        700 Avenue Centrale 38401 Saint-Martin-d’Hères, France
      </p>
      <div className="flex items-center gap-5">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2811.8172375578383!2d5.764789711875912!3d45.190795751518415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af50837597d0d%3A0x7089f5efffec5353!2sGrenoble%20Computer%20Science%20Laboratory%20-%20LIGLAB!5e0!3m2!1sen!2sfr!4v1745851827454!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
  )
}
