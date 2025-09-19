# LMS Builder - DIY Learning Management System

A modular DIY LMS built with Next.js, Supabase, and Tiptap that allows you to create, manage, and deliver online courses.

## Features

### 🎓 Course Authoring
- **Block-based content editor** with rich text, media, quizzes, and interactive elements
- **Module and lesson organization** with drag-and-drop ordering
- **Draft and publish workflow** with content validation
- **Media management** with Supabase storage integration
- **SEO optimization** for published content

### 📚 Learning Experience
- **Responsive learner interface** with progress tracking
- **Interactive quizzes** with instant feedback
- **Course navigation** with module/lesson sidebar
- **Progress indicators** and completion tracking
- **Mobile-optimized** reading experience

### 🛠 Management & Analytics
- **Multi-tenant architecture** with role-based access (admin/editor/viewer)
- **Course analytics** and learner progress tracking
- **Theme customization** per tenant
- **User enrollment management**
- **Settings and configuration** dashboard

### 🔒 Security & Privacy
- **Row Level Security (RLS)** enforced at database level
- **Tenant isolation** with strict access controls
- **User authentication** via Supabase Auth
- **GDPR-friendly** data handling

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Database**: Supabase (PostgreSQL with RLS)
- **Editor**: Tiptap for rich text editing
- **UI**: Tailwind CSS + shadcn/ui components
- **Validation**: Zod for schema validation
- **Storage**: Supabase Storage for media assets
- **Authentication**: Supabase Auth

## Quick Start

### 1. Prerequisites

- Node.js 18+ and npm
- Supabase project with database access
- Environment variables configured

### 2. Environment Setup

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

Run the LMS-specific migrations:

```bash
# Apply the LMS schema migration
psql -h your-db-host -U postgres -d your-db-name -f supabase/migrations/lms/001_create_lms_schema.sql

# Apply the storage bucket migration  
psql -h your-db-host -U postgres -d your-db-name -f supabase/migrations/lms/002_create_storage_bucket.sql
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/lms/dashboard` to access the LMS.

## Project Structure

```
src/
├── app/(lms)/lms/              # LMS routes (isolated routing group)
│   ├── dashboard/              # Author dashboard
│   ├── courses/                # Course management
│   ├── learn/                  # Learner interface
│   └── settings/               # Tenant settings
├── components/lms/             # LMS-specific components
│   ├── blocks/                 # Block renderers
│   ├── editor/                 # Content editor components
│   └── lesson-renderer.tsx     # Lesson display component
├── lib/lms/                    # LMS business logic
│   ├── actions.ts              # Server actions
│   ├── supabase.ts             # Database client
│   └── blocks/                 # Block schemas and utilities
└── types/                      # TypeScript definitions
    └── supabase.lms.ts         # Generated Supabase types
```

## Block System

The LMS uses a flexible block-based content system:

### Available Blocks
- **Text Rich**: Tiptap-powered rich text editor
- **Quote**: Highlighted quotes with citations
- **Image**: Images with alt text and captions
- **Video**: YouTube, Vimeo, or file-based videos
- **Callout**: Highlighted content boxes (note, warning, insight, theology)
- **Download**: File download links
- **Quiz MCQ**: Multiple choice questions with feedback
- **Quiz T/F**: True/false questions with feedback
- **CTA**: Call-to-action with customizable buttons

### Creating Custom Blocks

1. Define the schema in `src/lib/lms/blocks/schemas.ts`
2. Create a renderer in `src/components/lms/blocks/renderers.tsx`
3. Add to the block registry and metadata
4. Update the discriminated union type

## Database Schema

The LMS uses a dedicated `lms` schema with the following tables:

- **tenants**: Multi-tenant isolation
- **memberships**: User roles per tenant
- **courses**: Course metadata and settings
- **modules**: Course modules/chapters
- **lessons**: Individual lessons with blocks
- **enrollments**: User course enrollments
- **lesson_progress**: Learning progress tracking
- **media**: Asset management

All tables have Row Level Security (RLS) enabled with tenant-based policies.

## Content Authoring Workflow

1. **Create Tenant**: Set up your organization/brand
2. **Create Course**: Define course metadata and pricing
3. **Add Modules**: Organize content into logical sections  
4. **Create Lessons**: Build lesson content with blocks
5. **Preview**: Test content in draft mode
6. **Publish**: Make course available to learners
7. **Enroll Learners**: Add users or enable self-enrollment
8. **Track Progress**: Monitor completion and engagement

## Learner Experience

1. **Browse Courses**: Discover available courses
2. **Enroll**: Join courses (free or paid)
3. **Learn**: Progress through modules and lessons
4. **Interact**: Complete quizzes and interactive content
5. **Track Progress**: See completion status and scores
6. **Complete**: Finish courses and unlock achievements

## Customization

### Theming
- Modify LMS design tokens in `globals.css`
- Update tenant-specific themes via settings
- Customize component styles in `components/lms/`

### Extending Blocks
- Add new block types following the schema pattern
- Create corresponding renderers and editor components
- Update the block registry and metadata

### Integration
- Add payment processing (Stripe webhooks)
- Integrate with external authentication providers
- Connect analytics and reporting tools
- Add email notifications and certificates

## Security Considerations

- All database access is protected by RLS policies
- Tenant isolation is enforced at the database level
- User input is validated with Zod schemas
- File uploads are restricted by MIME type and size
- Media access is controlled through storage policies

## Performance

- Server-side rendering for SEO and fast loading
- Image optimization with Next.js Image component
- Lazy loading for large course catalogs
- Database query optimization with proper indexing
- CDN delivery for static assets

## Contributing

1. Follow the existing code patterns and conventions
2. Add tests for new features
3. Update documentation for API changes
4. Ensure RLS policies cover new database changes
5. Test multi-tenant isolation thoroughly

## License

This LMS implementation is part of the Alan Hirsch project and follows the same licensing terms.

## Support

For questions or issues:
1. Check the existing documentation
2. Review the database schema and RLS policies
3. Test in a development environment first
4. Ensure proper environment configuration

---

*Built with ❤️ for creating impactful learning experiences*
