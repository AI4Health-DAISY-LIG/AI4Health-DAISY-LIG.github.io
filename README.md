# Documents

Documents is a modern documentation starter kit built with **Next.js**, **React**, **Tailwind CSS**, and **TypeScript**. Designed for businesses, product teams, and technical writers, it provides a scalable and efficient foundation for building documentation websites, product manuals, and knowledge bases.

> **Demo**: [https://rubix-documents.vercel.app](https://rubix-documents.vercel.app)

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/rubixvi/rubix-documents)](https://img.shields.io/github/languages/top/rubixvi/rubix-documents)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rubixvi/rubix-documents)
[![Last Commit](https://img.shields.io/github/last-commit/rubixvi/rubix-documents)](https://img.shields.io/github/last-commit/rubixvi/rubix-documents)
[![GitHub issues](https://img.shields.io/github/issues/rubixvi/rubix-documents)](https://img.shields.io/github/issues/rubixvi/rubix-documents)
[![GitHub pull requests](https://img.shields.io/github/pulls/rubixvi/rubix-documents)](https://img.shields.io/github/pulls/rubixvi/rubix-documents)

[![GitHub stars](https://img.shields.io/github/stars/rubix-documents)](https://img.shields.io/github/stars/rubixvi/rubix-documents)
[![GitHub forks](https://img.shields.io/github/forks/rubix-documents)](https://img.shields.io/github/forks/rubixvi/rubix-documents)
[![GitHub repo size](https://img.shields.io/github/repo-size/rubix-documents)](https://img.shields.io/github/repo-size/rubixvi/rubix-documents)


---

## Overview

Documents enables businesses to deliver clear, structured, and accessible product documentation — with a focus on performance, usability, and maintainability.

Built for technical and content-driven projects, this starter kit supports Markdown (MDX), React components, and a flexible content architecture designed for scale.

---

## Features

### Content Management

- MDX support (Markdown with React components)
- Reusable custom components
- Mermaid.js for diagrams and flowcharts
- Tables and LaTeX math support

### Navigation & Structure

- Multi-level navigation
- Auto-generated table of contents
- Content pagination
- Code snippet switcher with copy functionality

### Development Experience

- Syntax highlighting with theme support
- Enhanced code blocks with titles and line highlighting
- Built-in light/dark mode with auto-detection
- SEO-ready with dynamic meta tags

### Search & Future Enhancements

- Fuzzy search with term highlighting
- Planned: AI-powered knowledgebase tools

---

## Quick Start

### Installation

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

Deploy to GitHubPages for automated builds and hosting.

### Customization

To make this template your own, you don't need to touch the core logic. Simply follow these steps:

### 1. Configure Navigation
The entire site structure (sidebar, breadcrumbs, and links) is driven by `settings/documents.ts`. To add a new section or change the order of pages, simply modify this file. The routing system will automatically detect your changes.

### 2. Add Content
Content is written in **MDX** format. Create a folder for your page within `contents/docs/[your-slug]/` and add an `index.mdx` file. You can use powerful built-in React components like `<Note />`, `<Step />`, or `<Code />` directly inside your Markdown to create interactive documentation.

### 3. Branding & SEO
Update your site's identity (Title, Description, OpenGraph images, and Twitter cards) by modifying the `Settings` configuration. This ensures your documentation looks professional when shared on social media and is optimized for search engines.


---

## Usage

Documents is designed to support:

- Product documentation
- Technical manuals
- Internal guides
- Business knowledge bases

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
