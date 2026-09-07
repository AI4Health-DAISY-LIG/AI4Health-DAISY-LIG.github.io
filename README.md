# AI4Health @DAISY, LIGLAB website

Our website uses Documents: a modern documentation starter kit built with **Next.js**, **React**, **Tailwind CSS**, and **TypeScript**. Designed for businesses, product teams, and technical writers, it provides a scalable and efficient foundation for building documentation websites, product manuals, and knowledge bases.



## Installation

```bash
git clone https://github.com/rubixvi/rubix-documents.git
cd rubix-documents
pnpm install
pnpm generate-content-json
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your project locally.

**For production:**

```bash
pnpm run build
pnpm run start
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the
static site to GitHub Pages. In the repository settings, choose **Pages > Build and
deployment > Source > GitHub Actions**.

## Promote a teaching website

Teaching websites remain in their own repositories. The main site displays a small
catalog at `/teaching`; it does not copy or rebuild the child website.

### Add a repository

1. Add one entry to `teachingRepositories` in `settings/teaching-sites.ts`:

   ```ts
   {
     owner: 'AI4Health-DAISY-LIG',
     repo: 'MyCourse',
     title: 'My Course',
     description: 'A short public description of the course.',
     url: 'https://ai4health-daisy-lig.github.io/MyCourse/',
   }
   ```

2. Add `.github/site.json` to the child repository:

   ```json
   {
     "title": "My Course",
     "description": "A short public description of the course.",
     "url": "https://ai4health-daisy-lig.github.io/MyCourse/"
   }
   ```

3. Add this workflow to the child repository as `.github/workflows/notify-main-site.yml`:

   ```yaml
   name: Notify AI4Health main site
   on:
     push:
       branches: [main]
   jobs:
     notify:
       runs-on: ubuntu-latest
       steps:
         - uses: peter-evans/repository-dispatch@v3
           with:
             token: ${{ secrets.MAIN_SITE_DISPATCH_TOKEN }}
             repository: AI4Health-DAISY-LIG/AI4Healthwebsite
             event-type: teaching-site-updated
   ```

4. Create a fine-grained GitHub token with access to the main repository's
   `Contents` permission, and save it in the child repository as the
   `MAIN_SITE_DISPATCH_TOKEN` Actions secret. A push to the child repository then
   triggers the main site's workflow, which fetches `.github/site.json`, rebuilds the
   catalog, and redeploys GitHub Pages.

For a quick local check, run `pnpm run update-teaching-sites` and inspect
`public/search-data/teaching-sites.json`.

---
## Customization

To make this template your own, you don't need to touch the core logic. Simply follow these steps:

### 1. Configure Navigation
The entire site structure (sidebar, breadpoints, and links) is driven by `settings/documents.ts`. To add a new section or change the order of pages, simply modify this file. The routing system will automatically detect your changes.

### 2. Add Content
Content is written in **MDX** format. Create a folder for your page within `contents/docs/[your-slug]/` and add an `index.mdx` file. You can use powerful built-in React components like `<Note />`, `<Step />`, or `<Code />` directly inside your Markdown to create interactive documentation.

### 3. Branding & SEO
Update your site's identity (Title, Description, OpenGraph images, and Twitter cards) by modifying the `Settings` configuration. This ensures your documentation looks professional when shared on social media and is optimized for search engines.

### 4. Custom URLs
To use a custom URL (e.g., changing `/installation` to `/guide-setup`), you must:
1. Update the `href` property in `settings/documents.ts`.
2. Rename the corresponding folder in `contents/docs/[your-slug]/` to match the new slug.

### 5. Change the welcome page
To change the text, the title or the welcome button style: 
go to : 
'app\page.tsx'
You'll see <h1> and <p> sections so as the configuration of the button class (buttonVariants). 

Modify the 'Get started' button:
    *   The file `app\page.tsx` contains the `Home` component.
    *   Inside this component, there is a `<Link>` with the text "Get Started".
    *   The destination of this link is dynamically generated using `PageRoutes[0].href`.

### 6. Change the navigation bar (top banner): update links
#### Ajouter de nouvelles pages et onglets de documentation (sidebar):                                                                                              

Pour ajouter du contenu de type documentation et l'intégrer à la navigation du site, suivez ces deux étapes :                                                  

1. Créer le contenu (La Source)                                                                                                           

Le contenu est stocké dans le dossier contents/docs/. Chaque page nécessite son propre dossier contenant un fichier index.mdx.            

 • Action : Créez un dossier contents/docs/[votre-slug]/.                                                                                 
 • Fichier : Ajoutez un fichier index.mdx à l'intérieur.                                                                                  
 • Exemple : Pour une page "Projets", créez contents/docs/projects/index.mdx.                                                            
 
 Le système de routagese fait alors automatiquement et dynamiquement 'lib/pageroutes'.ts                                                                                                            
                                                                                    

2. Configurer la navigation (L'Interface)                                                                                                 

Enfin, pour que l'onglet apparaisse dans votre barre de navigation (top bar ou sidebar), vous devez le lier à la route créée.             

 • Fichier : 'settings/navigation.ts'                                                                                                       
 • Action : Ajoutez un nouvel élément à l'array Navigations en utilisant la référence de la route définie dans PageRoutes.                
 • Exemple :                                                                                                                              
                                                                                                                                          
   {                                                                                                                                      
     title: 'Projets',                                                                                                                    
     href: `/docs${PageRoutes.find(p => p.title === 'Projets')?.href}`,                                                                   
   }                                                                                                                                      
                                                                                                                                          

▌ Note : Si vous utilisez des liens externes (ex: GitHub), vous pouvez simplement passer une URL complète dans settings/navigation.ts   
▌ sans passer par PageRoutes.   

#### Créer une page "Standalone"
Cette page est indépendante de la doc, elle n'apparaîtra pas dans la sidebar.                                                                                    

Utilisez ceci pour des pages comme "About", "Contact" ou "Projects" qui n'ont pas besoin de structure Markdown/MDX.                                

 1 Créer le dossier et le fichier dans app/ : Créez un nouveau dossier, par exemple app\projects\page.tsx. C'est ce fichier qui définit l'existence
   de la route /projects.                                                                                                                          
 2 Ajouter l'onglet dans settings\navigation.ts : Ajoutez manuellement le lien vers cette nouvelle route.                                          
                                                                                                                                                   
   {                                                                                                                                               
     title: 'Projects',                                                                                                                            
     href: '/projects', // L'URL doit correspondre exactement au nom du dossier dans app/                                                          
   }                                                                                                                                      

##### Ajouter du contenu dans la page standalone:
Oui, c'est exactement cela. Pour que votre fonction getProjects puisse trouver et lire les données, vous devez respecter une structure de dossiers 
précise.                                                                                                                                           

Chaque projet doit avoir son propre dossier à l'intérieur de contents/projects/, et ce dossier doit contenir un fichier nommé index.mdx.           

La structure exacte à suivre :                                                                                                                     

                                                                                                                                                   
votre-projet/                                                                                                                                      
└── contents/                                                                                                                                      
    └── projects/                                                                                                                                  
        ├── projet-alpha/                                                                                                                          
        │   └── index.mdx      <-- Le contenu du projet Alpha                                                                                      
        ├── projet-beta/                                                                                                                           
        │   └── index.mdx      <-- Le contenu du projet Beta                                                                                       
        └── projet-gamma/                                                                                                                          
            └── index.mdx      <-- Le contenu du projet Gamma                                                                                      
                                                                                                                                                   

Ce que doit contenir le fichier index.mdx :                                                                                                        

Pour que la carte (Card) s'affiche correctement avec les bonnes informations, votre fichier index.mdx doit impérativement contenir le frontmatter  
suivant au début du fichier.                                                                                                                     

                                                                                                                                                   
---                                                                                                                                                
title: "Nom de mon Projet"                                                                                                                         
description: "Une description courte qui apparaîtra sur la carte."                                                                                 
image: "/images/mon-projet.png"                                                                                                                    
---                                                                                                                                                
                                                                                                                                                   
# Contenu détaillé du projet                                                                                                                       
Ici, vous pouvez écrire tout le contenu détaillé de votre projet en Markdown ou MDX...                                                             
                                                                                                                                                   

En résumé:                                                                                                                        

Dans votre code lib\markdown.ts, la ligne suivante définit la recherche : const mdxPath = path.join(projectsDir, folder, 'index.mdx')              

 • projectsDir est contents/projects/.                                                                                                             
 • folder est le nom du sous-dossier que vous venez de créer (ex: projet-alpha).                                                                   
 • Le code cherche donc spécifiquement le fichier index.mdx à l'intérieur.  

#### En résumé :                                                                                                                 

                                                                                         
 Si vous voulez...     Vous devez créer...                 Et modifier...                
 ─────────────────────────────────────────────────────────────────────────────────────── 
 Un onglet "Doc"       Un dossier dans contents/docs/      documents.ts ET navigation.ts 
 Un onglet "Page Web"  Un dossier et un fichier dans app/  navigation.ts uniquement  

---

## Screenshots

![Main Screen](./public/screens/screen-1.png)
_Main Screen_

![Document Screen](./public/screens/screen-2.png)
_Document Screen_

![Document Footer](./public/screens/screen-3.png)
_Document Footer_

![Document Search](./public/screens/screen-4.png)
_Document Search_

![Main Dark Screen](./public/screens/screen-5.png)
_Main Dark Mode Screen_

![Document Dark Screen](./public/screens/screen-6.png)
_Document Dark Mode Screen_

---

## Contributing

We welcome contributions to improve this project.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

For support or inquiries:

Vincent Vu — [@rubxvi](https://x.com/rubixvi)

Rubix Studios — [https://rubixstudios.com.au](https://rubixstudios.com.au)

**Project:** [https://github.com/rubixvi/rubix-documents](https://github.com/rubixvi/rubix-documents)
