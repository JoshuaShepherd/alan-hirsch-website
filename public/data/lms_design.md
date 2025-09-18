# Mock: EdTech Dashboard & Course Management UI (from Provided Screens)

## 1) Title
EdTech Dashboard & Course Management Platform UI — Modern Minimalist with Bold Accents

## 2) Context & Goal
We are building a **student learning dashboard** and **course management system** inspired by the provided screenshots.  
Design language: clean **modular cards**, dark/light surfaces, **accent highlights**, and a **minimal typographic system (PP Agrandir)**.  
Goal: implement a faithful recreation of the **dashboard layout, course cards, statistics visualizations, and student management pages**.

## 3) Stack & Guardrails
- Next.js 14 App Router + TypeScript  
- TailwindCSS with CSS variables (tokens)  
- shadcn/ui components (Button, Card, Tabs, Avatar, Dialog, Dropdown, Progress, etc.)  
- Lucide-react for icons  
- No deletions of existing code; additive, modular commits only  
- Run `pnpm dev` after each section to validate build  

## 4) Information Architecture
- **Routes to add:**  
  - `/app/(dashboard)/dashboard/page.tsx` → main student dashboard  
  - `/app/(courses)/courses/page.tsx` → course listing & progress  
  - `/app/(students)/students/page.tsx` → student management list  
  - `/app/(tests)/tests/page.tsx` → self-paced tests  
- **Dashboard Sections (in order):**  
  - Sidebar nav (profile + navigation)  
  - Hero greeting + instructors row  
  - Topics row (subjects with icons)  
  - KPI cards (success rate, progress stats, pie/bar charts)  
  - Active courses list with ratings/progress  
  - Upcoming classes / timetable module  
- **Courses Page:**  
  - Kanban-style course tracker (Upcoming / Active / Completed)  
  - Statistics side panel with charts  
- **Students Page:**  
  - Search + student list  
  - Overview profile (photo, stats, tags, classes)  
- **Tests Page:**  
  - Self-paced test cards  
  - Summary & scores  

## 5) Design Tokens (Proposed)
```css
:root {
  --brand: #D3F26A;      /* lime highlight */
  --accent-orange: #FF4E00;
  --accent-purple: #9F8CE8;
  --surface-white: #FFFFFF;
  --surface-sand: #FF5FEA;
  --surface-grey: #CAC9B7;
  --surface-olive: #A2A28C;
  --surface-deep: #050517;
  --text-dark: #050517;
  --text-light: #FFFFFF;
}