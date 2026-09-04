# Bappa Ayurveda — Official Website

The official website for **Bappa Ayurveda**, an Ayurvedic wellness brand operated by **SPRTA Ayurenigma Private Limited**.

This project was developed as part of a 4-week website development internship, using a modern Next.js + Sanity architecture designed for content management, SEO, performance, and maintainability.

### Production Links

* **Website:** https://bappa-ayurveda.vercel.app
* **Sanity Studio:** https://bappa-ayurveda.vercel.app/studio
* **Design System:** https://bappa-ayurveda.vercel.app/playground

---

## Tech Stack

| Technology                  | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| **Next.js 16 — App Router** | Application framework, routing, rendering |
| **TypeScript**              | Type safety                               |
| **Tailwind CSS v4**         | Styling and responsive UI                 |
| **Sanity CMS**              | Blog and content management               |
| **GROQ**                    | Sanity data querying                      |
| **Vercel**                  | Hosting and deployment                    |
| **Heroicons**               | UI icons                                  |

---

## Architecture

The application follows a **headless CMS architecture**:

```text
┌─────────────────┐
│   Sanity CMS    │
│                 │
│ Posts           │
│ Authors         │
│ Categories      │
│ Tags            │
└────────┬────────┘
         │
         │ GROQ
         ▼
┌─────────────────┐
│     Next.js     │
│   App Router    │
│                 │
│ Server          │
│ Components      │
│ Data Queries    │
│ Metadata        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Website      │
│                 │
│ Vercel          │
└─────────────────┘
```

The frontend is responsible for presentation and application logic, while Sanity manages editorial content.

Server Components are used by default, with client components introduced only where browser-side interaction is required.

---

## Brand & Design System

Bappa Ayurveda uses an editorial, clinical, and restrained visual language.

### Design Tokens

| Token            | Value              |
| ---------------- | ------------------ |
| Background       | `#F7F3ED`          |
| Accent / Gold    | `#B8892A`          |
| Primary / Forest | `#2C4A3E`          |
| Body Text        | `#2A2A2A`          |
| Display Font     | Cormorant Garamond |
| Body Font        | DM Sans            |

### Design Principles

* **Editorial:** strong typography and structured content hierarchy
* **Clinical:** clear information presentation and restrained visual treatment
* **Restrained:** limited color palette and minimal decorative elements
* **Accessible:** semantic HTML, visible focus states, readable contrast, and responsive layouts

The complete design system can be explored at:

`/playground`

It documents:

* Color tokens
* Typography
* Spacing
* Elevation and shadows
* UI components
* Component usage and props

---

## Project Structure

```text
src/
├── app/
│   ├── (website)/                 # Public website routes
│   │   ├── page.tsx              # Homepage
│   │   ├── about/                # About pages
│   │   ├── authors/              # Author listing and profiles
│   │   ├── blog/                 # Blog listing and post pages
│   │   ├── tags/                 # Tag listing and tag pages
│   │   └── ...                   # Other public website routes
│   │
│   ├── (studio)/                 # Sanity Studio route group
│   │   └── studio/               # Embedded Sanity Studio
│   │
│   ├── api/
│   │   └── revalidate/           # Sanity webhook / cache revalidation
│   │
│   ├── layout.tsx                # Root application layout
│   ├── globals.css               # Global styles and design tokens
│   ├── not-found.tsx             # Custom 404 page
│   └── error.tsx                 # Global error boundary
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Section.tsx
│   │   └── ...
│   │
│   └── layout/                   # Site-wide layout components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── ScrollToTop.tsx
│       └── ...
│
├── lib/
│   ├── blog/                     # Blog-specific utilities and queries
│   ├── pagination/               # Pagination utilities
│   ├── seo/                      # SEO metadata utilities
│   ├── structured-data/          # JSON-LD / structured data utilities
│   ├── tableOfContents/          # Table of contents utilities
│   ├── cn.ts                     # Class name merge utility
│   └── ...
│
├── sanity/
│   ├── schemaTypes/              # Sanity content schemas
│   │   ├── post.ts
│   │   ├── author.ts
│   │   ├── category.ts
│   │   ├── tag.ts
│   │   └── blockContent.ts
│   │
│   ├── client.ts                 # Sanity client
│   ├── image.ts                  # Sanity image URL builder
│   ├── queries.ts                # GROQ queries
│   └── env.ts                    # Sanity environment helpers
│
└── types/
    └── index.ts                  # Shared TypeScript type definitions
```

### Directory Responsibilities

#### `app/`

Contains the application's routes, layouts, global styles, API routes, and route-level error handling.

The application uses **route groups** to separate the public website from the Sanity Studio without affecting the URL structure.

* `(website)` — public-facing website
* `(studio)` — Sanity Studio
* `api` — backend/API endpoints
* `globals.css` — global styles and design tokens
* `layout.tsx` — root layout
* `not-found.tsx` — custom 404 handling
* `error.tsx` — application error boundary

#### `components/`

Contains reusable presentation components.

* `ui/` — generic, reusable interface primitives
* `layout/` — components shared across the website layout

#### `lib/`

Contains application-level utilities and domain-specific logic.

* `blog/` — blog-related logic
* `pagination/` — reusable pagination logic
* `seo/` — metadata and SEO helpers
* `structured-data/` — structured data / JSON-LD generation
* `tableOfContents/` — table of contents extraction and processing
* `cn.ts` — utility for merging Tailwind class names

#### `sanity/`

Contains all Sanity CMS configuration and content integration.

* `schemaTypes/` — content models
* `client.ts` — Sanity client configuration
* `queries.ts` — GROQ queries
* `image.ts` — Sanity image URL handling
* `env.ts` — environment configuration

#### `types/`

Contains shared TypeScript types used across the application.


## Getting Started

### Prerequisites

* Node.js 18+
* npm
* A Sanity project with access to the project dataset

### Installation

```bash
git clone https://github.com/anik-hindu/bappa-ayurveda.git

cd bappa-ayurveda

npm install
```

### Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Add the required values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
NEXT_PUBLIC_SITE_URL=https://bappaayurveda.com
```

The Sanity project credentials can be obtained from the Sanity project management dashboard.

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## CMS — Sanity Studio

Sanity Studio is embedded directly into the Next.js application at:

```text
/studio
```

Authorized content editors can manage website content without modifying frontend code.

### Content Types

#### Blog Post

A post contains:

* Title
* Slug
* Author
* Category
* Tags
* Featured image
* Excerpt
* Body content
* Published date

#### Author

An author contains:

* Name
* Slug
* Profile photo
* Role
* Biography
* LinkedIn profile

#### Category

A category contains:

* Name/title
* Slug
* Description

#### Tag

A tag contains:

* Name
* Slug

Posts can reference authors, categories, and multiple tags.

---

## Publishing a Blog Post

1. Open `/studio`.
2. Sign in with an authorized Sanity account.
3. Select **Blog Post**.
4. Click **Create**.
5. Enter the required content.
6. Select the author, category, and tags.
7. Add the featured image.
8. Write the post body.
9. Click **Publish**.

After publication, the website's cache is revalidated through the configured Sanity webhook.

---

## Content Revalidation

The website uses tag-based cache revalidation to keep Sanity content synchronized with the frontend.

```text
Content updated in Sanity
          ↓
Sanity webhook
          ↓
/api/revalidate
          ↓
Cache tags invalidated
          ↓
Next.js fetches fresh content
          ↓
Updated website
```

This avoids requiring a full application redeployment whenever editorial content changes.

---

## SEO

The project includes a technical SEO foundation covering:

* Page-level metadata
* Dynamic titles and descriptions
* Canonical URLs
* Open Graph metadata
* Social sharing metadata
* `robots.txt`
* XML sitemap
* Dynamic metadata for content pages
* SEO-friendly URLs using slugs
* Semantic page structure

SEO-related logic is centralized where possible to keep metadata consistent across routes.

---

## Performance & Quality

The production site has been checked using **Google Lighthouse** with focus on:

* Performance
* Accessibility
* Best Practices
* SEO

The Lighthouse results were used to identify and address major production issues before handover.

---

## Deployment

The project is deployed on **Vercel**.

### Production

The `main` branch represents production.

```bash
git push origin main
```

A push to `main` triggers a production deployment.

### Preview

Development work is performed on `dev`.

Pushes to `dev` create Vercel preview deployments.

---

## Branch Strategy

| Branch | Purpose     |
| ------ | ----------- |
| `main` | Production  |
| `dev`  | Development |

Typical workflow:

```bash
# Start development
git checkout dev

# Make changes
git add .
git commit -m "Describe the change"
git push origin dev

# Merge approved changes into production
git checkout main
git merge dev
git push origin main

# Return to development
git checkout dev
```

---

## Project Status

The website implementation is complete and ready for handover.

### Completed

* [x] Next.js App Router architecture
* [x] Responsive website UI
* [x] Reusable component system
* [x] Bappa Ayurveda design system
* [x] Sanity CMS integration
* [x] Blog content architecture
* [x] Author architecture
* [x] Category architecture
* [x] Tag architecture
* [x] Blog listing
* [x] Blog detail pages
* [x] Author listing and profile pages
* [x] Tag pages
* [x] Dynamic content queries
* [x] Server-side data fetching
* [x] Cache and revalidation architecture
* [x] Technical SEO implementation
* [x] Page metadata
* [x] Open Graph metadata
* [x] Structured data
* [x] Sitemap and robots configuration
* [x] Custom 404 and error handling
* [x] Vercel deployment
* [x] Lighthouse validation
* [x] Requested feature implementation
* [x] Final UI/design updates

### Documentation Remaining

The following documentation is still to be completed as part of the final handover:

| Documentation            | Status    |
| ------------------------ | --------- |
| New Design Documentation | ⏳ Pending |
| CMS How-To Guide         | ⏳ Pending |
| SEO Documentation        | ⏳ Pending |

The remaining documentation covers the project's final design decisions, content-management workflows, and SEO implementation/reference information.

---

## Handover Checklist

### Development

* [x] Next.js application configured
* [x] TypeScript configured
* [x] Tailwind CSS configured
* [x] Sanity CMS integrated
* [x] Content schemas implemented
* [x] GROQ queries implemented
* [x] Cache revalidation implemented
* [x] Production deployment configured

### Content Management

* [x] Blog posts
* [x] Authors
* [x] Categories
* [x] Tags
* [x] Related content
* [x] Sanity Studio
* [x] Content publishing workflow

### SEO

* [x] Page metadata
* [x] Dynamic metadata
* [x] Canonical URLs
* [x] Open Graph metadata
* [x] Structured data
* [x] Sitemap
* [x] Robots configuration
* [x] SEO-friendly URLs
* [x] Lighthouse SEO validation
* [ ] SEO documentation

### Design

* [x] Design system
* [x] Responsive layouts
* [x] Reusable UI components
* [x] Final requested designs
* [ ] New design documentation

### Final Handover

* [x] Requested features implemented
* [x] Production deployment
* [x] Lighthouse validation
* [ ] CMS how-to documentation
* [ ] SEO documentation
* [ ] New design documentation


---

## Company

**SPRTA Ayurenigma Private Limited**
Operating as **Bappa Ayurveda**

* DPIIT Recognition No.: `DIPP247782`
* AYUSH Licensed
* GMP Certified
* Founder & CEO: **Shivansh Mishra**
* Company Website: https://bappaayurveda.com

---

## Developer

[**Anik Saha**](https://github.com/anik-hindu/)
Website Development Intern

**Internship:** August 1–29, 2026

---

## License

This project was developed for Bappa Ayurveda as part of the internship engagement. The source code and content are intended for the project and its authorized maintainers.
