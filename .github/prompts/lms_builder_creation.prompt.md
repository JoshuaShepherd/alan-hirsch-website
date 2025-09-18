---
mode: agent
---
# Copilot Prompt: Build DIY LMS (Supabase + Tiptap + shadcn) as Additive Feature

## Context & Goal
Create a **modular DIY LMS** (authoring + learner experience) using **Next.js App Router + TypeScript**, **Tailwind + shadcn/ui**, **Tiptap** for rich editing, and **Supabase** for data/auth/storage.  
**Do NOT delete or refactor existing app code or database objects.**  
Implement everything **additively** in its own **namespaced Supabase schema (`lms`)** and a separate storage bucket (`lms-assets`), with **strict RLS multi-tenancy** and clear file/module boundaries. Outcome: my clients can log in, create courses (Course → Module → Lesson with block-based content), preview, publish, enroll learners, and track progress.

---

## Stack & Guardrails
- Next.js 14+ App Router (`/app`) + TypeScript.
- TailwindCSS + **shadcn/ui** (import components locally via CLI if missing).
- **Tiptap** for rich text; **zod** for block schemas and server-action validation.
- **Supabase**: dedicated `lms` schema + RLS; `lms-assets` storage bucket.
- Additive only: **no breaking changes** to existing code or `public` schema objects; small, isolated commits.

---

## Information Architecture (Routes)
Add the following routes under an **isolated segment**:
- `/app/(lms)/lms/dashboard` — author’s home (course list, stats).
- `/app/(lms)/lms/courses/new` — course creator (wizard).
- `/app/(lms)/lms/courses/[courseId]` — course admin overview.
- `/app/(lms)/lms/courses/[courseId]/edit` — course editor (modules/lessons).
- `/app/(lms)/lms/courses/[courseId]/modules/[moduleId]/lessons/[lessonId]/edit` — lesson editor (Tiptap + block palette + live preview).
- `/app/(lms)/lms/learn/[courseSlug]` — learner course overview (published only).
- `/app/(lms)/lms/learn/[courseSlug]/[lessonSlug]` — learner lesson page.
- `/app/(lms)/lms/settings` — tenant/theme/settings for authors.

_Note:_ group them in a separate folder `(lms)` to keep concerns isolated.

---

## Design Tokens (Proposed)
Add the following tokens (CSS variables) in globals, then expose Tailwind theme extensions (comment-only snippet; do not break existing theme):

- Colors:  
  `--lms-brand: #3B82F6; --lms-accent: #22C55E; --lms-surface: #0B1020; --lms-card: #111827; --lms-border: #1F2937; --lms-text: #F9FAFB; --lms-muted: #9CA3AF`
- Radii: `--lms-radius: 16px; --lms-radius-lg: 24px`
- Shadows: soft ambient + short drop for cards (two-layer)
- Type scale:  
  Display: `clamp(2rem, 6vw, 3.25rem)`; H2: `clamp(1.5rem, 3vw, 2rem)`; Body: `clamp(0.95rem, 1vw, 1.0625rem)`

*(Comment a small Tailwind `theme.extend` sample; do not overwrite existing config.)*

---

## Typography System
- Families: `Inter` (or existing sans) + code fallback; keep consistent with current app.
- Headings: bold, tight leading for display; normal for H2/H3.
- Body: 1.6–1.7 line-height; readable widths (~65ch).
- Buttons/Links: shadcn Button, Link styled via tokens.

---

## Layout & Grid
- **Authoring UI**: 3-pane when wide:  
  Left = **Block Palette** (collapsible)  
  Center = **Canvas/Live Preview**  
  Right = **Inspector/Properties** (forms generated from zod schemas).  
- **Learner UI**: centered content column with sticky progress bar and Next/Prev controls; module/lesson nav in a side rail on desktop, collapsible on mobile.

---

## Supabase Setup (New Namespaced Schema)
1. Create **schema `lms`** and **storage bucket `lms-assets`**.  
2. Migrate with **SQL files** committed under `/supabase/migrations/lms/*.sql` (do not mix with unrelated migrations).  
3. Enable **RLS on all tables**; policies keyed by `tenant_id` and `auth.uid()` memberships.  
4. Generate **typed client types** for `lms` schema into `types/supabase.lms.ts`.

### SQL (outline)
Create the following tables in `lms` schema:

- `tenants(id uuid pk default gen_random_uuid(), name text, slug text unique, owner uuid not null, theme_json jsonb default '{}'::jsonb, created_at timestamptz default now())`
- `memberships(tenant_id uuid fk → lms.tenants, user_id uuid not null, role text check (role in ('admin','editor','viewer')) default 'admin', primary key (tenant_id, user_id))`
- `courses(id uuid pk default gen_random_uuid(), tenant_id uuid fk, slug text unique, title text not null, summary text, status text check (status in ('draft','review','published')) default 'draft', price_cents int default 0, featured_media text, created_by uuid, created_at timestamptz default now(), published_at timestamptz)`
- `modules(id uuid pk default gen_random_uuid(), course_id uuid fk, title text not null, "order" int not null, created_at timestamptz default now())`
- `lessons(id uuid pk default gen_random_uuid(), module_id uuid fk, slug text, title text not null, "order" int not null, duration_estimate int default 10, status text check (status in ('draft','review','published')) default 'draft', tiptap_doc jsonb default '{}'::jsonb, blocks_json jsonb default '[]'::jsonb, seo_json jsonb default '{}'::jsonb, created_at timestamptz default now(), published_at timestamptz)`
- `enrollments(id uuid pk default gen_random_uuid(), course_id uuid fk, user_id uuid not null, status text check (status in ('active','canceled','completed','refunded')) default 'active', started_at timestamptz default now(), completed_at timestamptz, progress_pct int default 0)`
- `lesson_progress(id uuid pk default gen_random_uuid(), lesson_id uuid fk, user_id uuid not null, status text check (status in ('not_started','in_progress','completed')) default 'in_progress', last_viewed_at timestamptz default now(), score_json jsonb default '{}'::jsonb)`
- `media(id uuid pk default gen_random_uuid(), tenant_id uuid fk, url text not null, type text check (type in ('image','video','audio','file')), alt text, meta_json jsonb default '{}'::jsonb, created_at timestamptz default now())`

**Indexes:**  
- per-tenant: `courses(tenant_id)`, `modules(course_id)`, `lessons(module_id)`, etc.  
- slugs: unique where needed.  
- enrollment lookup by `(user_id, course_id)`.

**RLS Policies (examples)**  
- Tenants: owner can read/write; members based on role.  
- Courses/Modules/Lessons/Media: `tenant_id` must match membership; `role in ('admin','editor')` to write; `published` lessons readable by anyone with active enrollment.  
- Enrollments/Progress: user reads/writes own; tenant admins can read.  
- Storage: bucket `lms-assets` policy: only tenant members can read/write tenant-owned files; public read optional for published assets.

**IMPORTANT**: Keep these SQL migrations **scoped to `lms` schema**, never touching existing `public` tables.

---

## Data Access Layer & Types
- Add a **Supabase client wrapper** scoped to `lms` with typed queries in `/lib/lms/supabase.ts`.
- Generate and import types: `supabase gen types typescript --db-url ... --schema lms > types/supabase.lms.ts`.
- Create **server actions** for create/update/delete across `courses/modules/lessons/blocks`, all **zod-validated**.

---

## Block System (Editor & Renderer)
Implement a **schema-driven block system**. Each block has a zod schema and renderer.

**Initial Blocks:**
- `TextRich` (Tiptap JSON)  
- `Quote` (text, cite)  
- `Image` (src, alt, caption)  
- `Video` (provider: 'mux'|'youtube'|'vimeo'|'file', src, poster?, captions[])  
- `Callout` (variant: 'note'|'warning'|'insight'|'theology', title?, body RichText)  
- `Download` (href, label, size?)  
- `QuizMCQ` (stem RichText, options[{id,text}], correctIds[], shuffle?, feedback RichText)  
- `QuizTF` (statement, correct boolean, feedback?)  
- `CTA` (headline, body?, button{label, href})

**Files:**
- `/lib/lms/blocks/schemas.ts` — zod schemas + TS types
- `/components/lms/blocks/*` — one renderer per block (a11y first; shadcn primitives)
- `/components/lms/editor/block-palette.tsx` — list/search/drag-drop
- `/components/lms/editor/inspector.tsx` — form auto-generated from zod schema
- `/components/lms/editor/canvas.tsx` — live preview with renderer registry
- `/components/lms/lesson-renderer.tsx` — public runtime renderer (SSR-friendly; hydrate interactive blocks)

**Validation & Safety:**
- Validate on **client (form)** and **server (write)** with identical schemas.
- Fallback render for invalid props with non-crashing message in dev.

---

## Authoring Experience (shadcn-first)
- **Course Admin**: create/edit course meta, price, status; module and lesson ordering (drag-and-drop).
- **Lesson Editor**:  
  - Tiptap instance for rich fields; slash commands to insert blocks  
  - Block Palette (left), Canvas (center), Inspector (right)  
  - **Autosave** draft every 5s (debounced)  
  - **Draft Mode** preview route for unpublished content  
  - Validation gate before publish (SEO, required props)

- **Media**: upload to Supabase `lms-assets` bucket; expose picker dialog; store URL + alt in `media`.

- **Theme Settings** (per tenant): store tokens in `tenants.theme_json` with safe UI controls (color pickers, radii sliders).  

---

## Learner Experience
- `/lms/learn/[courseSlug]`: Course overview, modules/lessons list, **resume** button, % progress.
- `/lms/learn/[courseSlug]/[lessonSlug]`: Lesson page with:  
  - Sticky progress bar; Next/Prev lesson controls  
  - `LessonRenderer` for blocks  
  - **Mark complete** button; quizzes write outcomes into `lesson_progress.score_json`

- **Gating**:  
  - Published lessons visible only to users with **active enrollment**; otherwise show CTA/paywall.

---

## Payments (Optional Stub)
- Add a **Stripe checkout stub** (no live keys): API route and webhook placeholders writing to `enrollments` with `status='active'` when purchase succeeds.  
- Keep additive; do not alter existing payment code if any.

---

## Motion & Microinteractions
- Authoring UI: subtle panel slide/scale on open; palette items hover raise (2px), inspector field focus ring.
- Lesson blocks: reduced motion support; quiz feedback fades in ≤ 150ms.

---

## Responsive Rules
- Authoring: 3-pane collapses to 2-pane on tablet (palette collapsible); 1-pane on mobile (tabs for Palette/Canvas/Inspector).  
- Learner: mobile-first reading; comfortable line lengths; tappable targets ≥ 44px.

---

## Accessibility Requirements
- Semantic structure: `<main>`, landmarks, labels for all inputs.  
- Focus-visible rings; keyboard navigable palette, reorder handles, and inspector fields.  
- Color contrast AA+; warn authors for missing `alt`, captions, or poor contrast.  
- ARIA live announcements for block add/remove, quiz results, save status.

---

## Files to Create/Modify
- **New folders:**
  - `/app/(lms)/lms/...` (routes listed above)
  - `/components/lms/...` (blocks, editor, shared UI)
  - `/lib/lms/...` (supabase, DAL, zod, utils)
  - `/types/supabase.lms.ts`
  - `/supabase/migrations/lms/XXXX_create_lms_schema.sql` (and subsequent)
- **Modify (additive):**
  - Tailwind config (theme.extend comments only)  
  - Global CSS: add `:root` LMS tokens (non-destructive)  
  - shadcn import scripts if needed (no removal of existing components)

---

## Test Plan (Quick)
- **Authoring**: create tenant (seed), add course/module/lesson, add blocks, save, publish.  
- **RLS**: verify author can read/write their tenant; non-members forbidden; published visibility only to enrolled users.  
- **Learner**: enroll test user, navigate lessons, mark complete, submit quizzes; verify `lesson_progress`.  
- **A11y**: keyboard nav through editor and lesson; Lighthouse a11y ≥ 95; color contrast checks.  
- **Perf**: Lighthouse performance ≥ 90 on learner routes; ensure renderer SSR with minimal hydration.

---

## Deliverables Checklist
- [ ] `lms` schema + tables + RLS policies + indexes via scoped migrations  
- [ ] `lms-assets` storage bucket + policies  
- [ ] Generated TS types for `lms` schema  
- [ ] Supabase DAL with zod-validated server actions  
- [ ] Block system: schemas + renderers + registry  
- [ ] Authoring UI: dashboard, course admin, lesson editor (palette/canvas/inspector), draft preview  
- [ ] Learner UI: course overview, lesson runtime with progress and quizzes  
- [ ] Optional Stripe stubs (non-breaking)  
- [ ] Tokens + minimal theming controls per tenant  
- [ ] Basic docs: README-LMS.md with setup steps (migrations, env, roles)

---

## Do Not
- Do **not** delete or rename any existing routes/components/config.  
- Do **not** modify existing Supabase `public` tables or buckets.  
- Do **not** hardcode secrets; use `.env.local` with safe defaults.  
- Do **not** bypass RLS—enforce access in server actions and policies.


