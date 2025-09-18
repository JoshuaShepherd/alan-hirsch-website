# Alan Hirsch Website - AI Coding Agent Instructions

## Architecture Overview

This is a **Next.js 15.5.0** website for Alan Hirsch, focused on missional church renewal and leadership development. The project uses **App Router** with a content-heavy architecture designed around books, partner organizations, and thought leadership.

### Key Architectural Patterns

- **Content-First Design**: Books (`src/content/books/`) drive major functionality with MDX processing
- **Partner Ecosystem**: Six partner organizations (`5q/`, `movement-leaders/`, `100movements/`, `forge/`, `future-travelers/`, `crm/`) with dedicated pages and cross-linking
- **Editorial Modern Theme**: Custom design system with carefully curated typography and color palette
- **Static + Interactive**: Static content with interactive features like the EbookReader component

## Core Tech Stack

- **Framework**: Next.js 15.5.0 with App Router, TypeScript
- **Styling**: Tailwind CSS v4 with custom Editorial Modern theme
- **Content**: MDX processing via `@mdx-js/react` and `gray-matter`
- **Components**: Custom components + shadcn/ui (New York style)
- **Theme**: Custom light/dark mode system with `ThemeProvider`

## Critical File Patterns

### Content Structure
```
src/content/books/[book-id]/
├── chapter-01.mdx
├── chapter-02.mdx
└── ...
```

Each MDX file requires frontmatter with `title`, `chapter`, `bookTitle`, `author`, `description`, `keywords`, `readingTime`, `difficulty`.

### App Router Structure
- **Partner Pages**: `/5q`, `/movement-leaders`, `/100movements`, `/forge`, `/future-travelers`, `/crm`
- **Content Pages**: `/books/[bookId]`, `/books/[bookId]/[chapterSlug]`
- **Static Pages**: `/about`, `/speaking`, `/resources`, `/contact`

### Component Conventions
- **Theme-aware**: All components use CSS custom properties from `globals.css`
- **Responsive**: Mobile-first with `lg:` breakpoints for desktop
- **Editorial Modern**: Use classes like `font-display`, `text-display-lg`, `section-padding`, `max-w-content`

## Development Workflows

### Commands
```bash
npm run dev --turbopack    # Development with Turbopack
npm run build --turbopack  # Production build with Turbopack  
npm run lint               # ESLint validation
```

### Key Libraries
- `gray-matter`: Frontmatter parsing for MDX files
- `lucide-react`: Icon system (prefer over other icon libraries)
- `class-variance-authority`: Component variant patterns
- `tailwind-merge`: Conditional class merging

## Project-Specific Conventions

### Design System (Editorial Modern)
```css
/* Colors */
--color-paper: #F8F8F6    /* Background */
--color-ink: #111111      /* Primary text */
--color-indigo: #1D4A38   /* Primary brand */
--color-rust: #B2613E     /* Accent */

/* Typography */
--font-display: Crimson Pro (headings)
--font-body: Inter (body text)
```

### CSS Utility Classes
- `section-padding` / `section-padding-lg`: Consistent vertical spacing
- `max-w-content` (700px) / `max-w-container` (1200px): Content width constraints
- `text-display-lg`, `text-display-md`: Display typography scale
- `prose prose-lg max-w-none text-foreground`: Long-form content styling

### SEO Patterns
Every page includes:
- `Metadata` export with title, description, keywords
- Structured data (`application/ld+json`) for organization/person markup
- UTM tracking on external links (`?utm_source=alanhirsch&utm_medium=referral`)

### Book/Content Processing
- Use `src/lib/books.ts` utilities for MDX processing
- Books are processed server-side with frontmatter extraction
- EbookReader component handles client-side reading experience
- Search functionality works across chapter content

## Integration Points

### Theme System
- `src/components/theme-provider.tsx`: Context-based theme management
- Persists to localStorage with key `alan-hirsch-theme`
- Three-state: light/dark/system with proper SSR handling

### Partner Organization Strategy
- Each partner has dedicated route and page
- Toolkit page (`/toolkit`) serves as hub with organization grid
- Cross-linking strategy with UTM tracking for attribution
- Consistent page structure: Hero → Description → Features → CTA

### Content Management
- MDX files in `src/content/books/[book-id]/`
- Frontmatter-driven metadata and navigation
- Chapter-based routing with slug generation
- Full-text search across book content

## Common Pitfalls

1. **Theme Classes**: Always use CSS custom properties, not hardcoded colors
2. **MDX Processing**: Ensure frontmatter matches expected interface in `books.ts`
3. **Route Structure**: Partner pages use kebab-case (`movement-leaders` not `movementLeaders`)
4. **Image Paths**: Book covers in `/images/books/`, partner logos in `/images/partners/`
5. **UTM Tracking**: All external partner links must include UTM parameters

## Quick References

- **Theme Toggle**: Located in Header component, uses lucide-react sun/moon icons
- **Navigation**: Header includes Books, Resources, Speaking, About, Contact
- **Footer**: Partner logos and links section (not yet implemented)
- **Typography Scale**: `text-display-xl` > `text-display-lg` > `text-display-md`
- **Content Width**: `max-w-content` for articles, `max-w-container` for layouts

## 🧰 Vendor SDKs (use only these patterns)

All agent code must follow patterns and APIs found in our vendored directories (do not import from the internet, do not invent new APIs):

- `vendor/openai-agents-js-main/` – Core Agents framework & examples
- `vendor/openai-realtime-agents-main/` – Realtime agents UI (Next.js)
- `vendor/openai-realtime-api-beta-main/` – Realtime WS client

When building agents or tools:

1. Read the README + examples in these dirs.
2. Reuse provided utilities, types, and tool patterns.
3. Provide Zod validators at tool boundaries.
4. Never invent new transport layers or unsupported APIs.