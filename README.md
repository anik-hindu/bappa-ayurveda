# Bappa Ayurveda — Official Website

The official website for Bappa Ayurveda, a DPIIT-recognized, AYUSH-licensed Ayurvedic wellness brand. Built as part of a 4-week internship project.

**Live:** https://bappa-ayurveda.vercel.app  
**CMS Studio:** https://bappa-ayurveda.vercel.app/studio  
**Design System:** https://bappa-ayurveda.vercel.app/playground

---

## Tech Stack

| Tool                    | Purpose                   |
| ----------------------- | ------------------------- |
| Next.js 16 (App Router) | Framework                 |
| Tailwind CSS v4         | Styling                   |
| Sanity CMS              | Blog & content management |
| Vercel                  | Deployment                |
| TypeScript              | Type safety               |
| Heroicons               | Line icons                |

---

## Brand

| Token            | Value              |
| ---------------- | ------------------ |
| Background       | `#F7F3ED`          |
| Accent (Gold)    | `#B8892A`          |
| Primary (Forest) | `#2C4A3E`          |
| Body Text        | `#2A2A2A`          |
| Display Font     | Cormorant Garamond |
| Body Font        | DM Sans            |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/anik-hindu/bappa-ayurveda.git
cd bappa-ayurveda
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
```

Get these from [sanity.io/manage](https://sanity.io/manage) → your project → API.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/ # Pages and routing
│ ├── layout.tsx # Root layout — Navbar + Footer
│ ├── page.tsx # Homepage
│ ├── studio/ # Sanity Studio (embedded)
│ ├── playground/ # Living design system docs
│ ├── not-found.tsx # Custom 404 page
│ └── error.tsx # Custom 500 page
├── components/
│ ├── ui/ # Atomic components
│ │ ├── Button.tsx
│ │ ├── Badge.tsx
│ │ ├── Input.tsx
│ │ ├── Section.tsx
│ │ └── index.ts
│ └── layout/ # Layout components
│ ├── ScrollToTop.tsx
│ ├── Navbar.tsx
│ └── Footer.tsx
├── lib/
│ ├── cn.ts # Class merge utility
├── sanity/ # Sanity configuration
│ ├── schemaTypes/ # Content schemas
│ │ ├── post.ts
│ │ ├── author.ts
│ │ ├── category.ts
│ │ └── blockContent.ts
│ ├── client.ts # Sanity client
│ ├── image.ts # Image URL builder
│ └── queries.ts # GROQ query functions
│ └── env.ts # Environment helpers
├── styles/
│ └── globals.css # Design tokens + base styles
└── types/
└── index.ts # TypeScript type definitions
```

---

## CMS — Sanity Studio

The CMS Studio is embedded at `/studio`. Founders can log in and manage content without touching code.

**Content types:**

- **Blog Post** — title, slug, author, category, image, excerpt, body, published date
- **Author** — name, slug, photo, role, bio, LinkedIn
- **Category** — title, slug, description

**To publish a blog post:**

1. Go to `bappa-ayurveda.vercel.app/studio`
2. Click **Blog Post → Create**
3. Fill in all fields
4. Click **Publish**

The post appears on the website immediately.

---

## Deployment

The project is connected to Vercel. Every push to `main` triggers an automatic deployment.

```bash
# Deploy to production
git push origin main
```

Preview deployments are created automatically for every push to `dev`.

---

## Branch Strategy

| Branch | Purpose                             |
| ------ | ----------------------------------- |
| `main` | Production — auto-deploys to Vercel |
| `dev`  | Daily development work              |

```bash
# Start working
git checkout dev

# Merge to production at end of week
git checkout main
git merge dev
git push origin main
git checkout dev
```

---

## Design System

Full documentation at `/playground`. Covers:

- Color tokens (4 colors only)
- Typography scale
- Spacing rhythm (8px base unit)
- Elevation / shadows
- Component props and usage

---

## 4-Week Delivery Plan

| Week   | Focus                                      | Status         |
| ------ | ------------------------------------------ | -------------- |
| Week 1 | Foundation, design system, CMS, components | ✅ Complete    |
| Week 2 | Homepage — all sections                    | 🔄 In progress |
| Week 3 | Blog system — listing, posts, authors, SEO | ⏳ Upcoming    |
| Week 4 | Polish, testing, deployment, handover      | ⏳ Upcoming    |

---

## Company

**SPRTA Ayurenigma Private Limited**  
Operating as **Bappa Ayurveda**  
DPIIT Recognition No. DIPP247782  
AYUSH Licensed · GMP Certified

**Founder & CEO:** Shivansh Mishra  
**Website:** [bappaayurveda.com](https://bappaayurveda.com)

---

## Developer

**Anik Saha** — Website Development Intern  
August 1–29, 2025
