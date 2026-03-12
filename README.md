# LibreFang Docs

Documentation site for [LibreFang](https://librefang.ai/), the open-source agent operating system written in Rust.

This repository contains the public docs frontend, bilingual MDX content, shared navigation/search components, and the static export configuration used to publish the site.

## Stack

- Next.js 15 App Router
- MDX for content pages
- Tailwind CSS 4 for styling
- FlexSearch-based local search generated at build time
- Static export output for deployment to any static host

## Requirements

- Node.js 22 recommended via [`.node-version`](.node-version)
- Node.js 18+ supported by [`package.json`](package.json)
- `pnpm` 9+

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the development server on `http://localhost:3001`:

```bash
pnpm dev
```

Useful project commands:

```bash
pnpm build
pnpm typecheck
```

`pnpm build` generates a static export in `out/`.

## Project Structure

```text
src/app/                App Router pages and MDX routes
src/app/zh/             Simplified Chinese documentation
src/components/         Shared layout, navigation, search, and UI components
src/mdx/                MDX plugins and search indexing pipeline
src/styles/             Global Tailwind styles
next.config.mjs         Next.js + MDX + static export configuration
```

## Content Layout

- `/` is the landing page
- English docs live at root routes such as `/getting-started`, `/api`, and `/cli`
- Simplified Chinese docs live under `/zh`, such as `/zh/librefang` and `/zh/api`

The sidebar configuration is maintained in [`src/components/Navigation.tsx`](src/components/Navigation.tsx).

## Adding or Updating Docs

1. Create or edit an MDX page under [`src/app`](src/app) for English or [`src/app/zh`](src/app/zh) for Chinese.
2. Use a `page.mdx` file for each route.
3. Export a `sections` array so the page can participate in section navigation.
4. Update [`src/components/Navigation.tsx`](src/components/Navigation.tsx) if the page should appear in the sidebar.
5. When a topic exists in both languages, keep the English and Chinese pages aligned as closely as practical.

Minimal MDX page example:

```mdx
# Page Title

## Overview

Page content goes here.

export const sections = [
  { title: 'Overview', id: 'overview' }
]
```

If a page does not need section anchors yet, export an empty array:

```mdx
export const sections = []
```

## Contribution Checklist

Before committing documentation or UI changes, run:

```bash
pnpm typecheck
pnpm build
```

If you changed page structure, routes, or headings, also do a quick local pass in the browser to confirm:

- the sidebar entry appears in the expected group
- in-page section links still work
- search results still surface the updated page content

## Search

This site uses a local search index generated from MDX content during the build process. The indexing pipeline lives in [`src/mdx/search.mjs`](src/mdx/search.mjs), so no external search service is required for the default setup.

## Deployment

The app is configured with `output: "export"` in [`next.config.mjs`](next.config.mjs), which means the production build is a static site. You can deploy the generated `out/` directory to Cloudflare Pages or any other static hosting platform.
