# Capture the Flag (CTF) Write-Ups Portfolio

A modern, responsive Next.js portfolio built specifically for showcasing Capture the Flag (CTF) write-ups and cybersecurity research. I created this project to showcase my research and write-ups in a format that is engaging, easy-to-read, and kept separate from my main portfolio.

## Features

- **Markdown Write-Ups**: Write and publish your CTF solutions using simple Markdown. Supports GitHub Flavored Markdown, syntax highlighting, tables, and images.
- **Dynamic Routing**: Automatically generates dedicated pages for each report based on its markdown filename (`/write-ups/[slug]`).
- **Sleek UI & Animations**: Built with Tailwind CSS and Framer Motion for beautiful scroll animations, fade-ups, and an immersive user experience.
- **Responsive Reports Grid**: Browse write-ups in Grid, Card, or List views with real-time category filtering and search.
- **Stats Dashboard**: A live-updating `/stats` page that automatically aggregates data from your markdown files to show category distribution, monthly activity, and a chronological timeline.
- **Dark Mode Aesthetic**: A custom frosted-glass, hacker-inspired dark theme tailored for cybersecurity content.
- **Mobile Optimized**: Fully responsive layout including a collapsible hamburger navigation menu.

## Tech Stack

- [Next.js 16 (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- [Gray-Matter](https://github.com/jonschlinkert/gray-matter) (Frontmatter parsing)
- [React-Markdown](https://github.com/remarkjs/react-markdown)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd capture-the-flag-write-up
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding New Write-Ups

To add a new write-up, simply create a `.md` file inside the `content/reports/` directory. The file must include the following YAML frontmatter at the top:

```yaml
---
title: "Your Report Title"
slug: "url-friendly-slug"
category: "web-application" # or linux, windows, password-cracking, etc.
description: "A brief summary of the challenge and your solution."
date: "YYYY-MM-DD"
---
```

Once saved, the portfolio will automatically parse the file, add it to the Reports Grid, generate its dedicated page, and update the Stats Dashboard!

## Customization

- **Styling**: Tweak the primary and background colors inside `app/globals.css` and `tailwind.config.ts`.
- **Navigation**: Update the links in `components/Main/Navigation/NavigationBar.tsx`.
- **Contact Info**: Modify your email and social links in `components/Contact/ContactForm.tsx`.
