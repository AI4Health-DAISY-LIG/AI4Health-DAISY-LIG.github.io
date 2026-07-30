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

      <div className="flex items-center gap-5">
        <Link
          className={buttonVariants({ className: 'px-6', size: 'lg' })}
          href={`/docs${PageRoutes[0].href}`}
        >
          Explore
        </Link>
      </div>
    </section>
  )
}
