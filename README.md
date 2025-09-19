# Alan Hirsch

A modern React Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Linting**: ESLint

## Contemporary Meta Design System (Opt-in)

This project includes a **contemporary visual meta layer** built on top of the existing Editorial Modern theme. All enhancements are **additive and opt-in** - existing functionality remains unchanged.

### Quick Start

```tsx
// Enhanced components (opt-in)
import { Shell, Eyebrow, Prose } from '@/components/primitives';
import { FadeIn, Interactive } from '@/components/motion';

<FadeIn delay={0.1}>
  <Shell variant="elevated" size="md">
    <Eyebrow variant="accent">Featured</Eyebrow>
    <h2>Enhanced Content</h2>
    <Prose variant="contemporary">
      <p>Contemporary typography with better spacing...</p>
    </Prose>
  </Shell>
</FadeIn>
```

### Available Enhancements

- **Design Tokens**: Enhanced spacing (8pt grid), shadows, border radius, motion timing
- **Primitives**: Shell (cards), Eyebrow (labels), Prose (typography)
- **Motion**: FadeIn, Stagger, Interactive components with accessibility support
- **Focus**: Enhanced focus rings with brand colors
- **Accessibility**: Full `prefers-reduced-motion` support

### Documentation

- **[DESIGN.md](./DESIGN.md)** - Complete design system documentation
- **[MIGRATION-NOTES.md](./MIGRATION-NOTES.md)** - Step-by-step adoption guide
- **[DESIGN-AUDIT.md](./DESIGN-AUDIT.md)** - Pre-implementation audit

### Feature Flags

Control enhancement adoption via environment variables:

```bash
ENABLE_CONTEMPORARY_SHADOWS=true
ENABLE_MOTION_ENHANCEMENTS=true
ENABLE_GLASS_EFFECTS=false
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
