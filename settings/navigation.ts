import { PageRoutes } from '@/lib/pageroutes'

export const Navigations = [
  {
    title: 'Main',
    href: `/docs${PageRoutes[0].href}`,
  },
  {
    title: 'Projects',
    href: `/projects`,
  },
  {
    title: 'Our group',
    href: `/${PageRoutes.find(p => p.title === 'Our group')?.href}`,
  },
  {
    title: 'Openings',
    href: `/${PageRoutes.find(p => p.title === 'Projets')?.href}`,
  },
  {
    title: 'Meetings',
    href: `/${PageRoutes.find(p => p.title === 'Meetings')?.href}`,
  },
  {
    title: 'Find us',
    href: `/${PageRoutes.find(p => p.title === 'Find us')?.href}`,
  },
  // {
  //   title: 'Rubix',
  //   href: 'https://rubixstudios.com.au',
  //   external: true,
  // },
]

export const GitHubLink = {
  href: 'https://github.com/AI4Health-DAISY-LIG',
}
