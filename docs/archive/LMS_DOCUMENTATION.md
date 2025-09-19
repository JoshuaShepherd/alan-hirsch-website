# LMS Builder System - Complete Documentation

## 🎓 Overview

This is a comprehensive Learning Management System (LMS) builder integrated into the Alan Hirsch website. The LMS provides a robust platform for creating, managing, and delivering online courses with rich multimedia content and interactive learning experiences.

## ✨ Key Features

### 🎯 Core LMS Capabilities
- **Multi-tenant Architecture**: Isolated organizations with role-based access control
- **Course Management**: Create, organize, and publish courses with modules and lessons
- **Rich Content Blocks**: Text, images, videos, quizzes, downloads, callouts, and more
- **Student Progress Tracking**: Monitor learner engagement and completion rates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Media Management**: Integrated asset storage and optimization

### 📚 Content Authoring System
- **Block-based Editor**: Drag-and-drop content creation with live preview
- **Tiptap Integration**: Professional rich text editing with collaborative features
- **Module & Lesson Hierarchy**: Structured course organization
- **Draft & Publish Workflow**: Content review and publishing pipeline
- **Comprehensive Media Library**: Centralized asset management

### 🎓 Learner Experience
- **Course Discovery**: Browse and enroll in published courses
- **Progress Tracking**: Resume where you left off with automatic bookmarking
- **Interactive Assessments**: Quizzes with immediate feedback
- **Mobile Learning**: Fully responsive learning interface

## 🏗️ Technical Architecture

### Database Schema (Supabase)
The LMS uses a dedicated `lms` schema with the following structure:

```sql
-- Core tables
tenants              -- Multi-tenant organizations
memberships          -- User-tenant relationships with roles  
courses              -- Course metadata and configuration
modules              -- Course sections/chapters
lessons              -- Individual learning units
lesson_blocks        -- Content blocks within lessons

-- Learning management
enrollments          -- Student course registrations
lesson_progress      -- Individual lesson completion tracking
quiz_responses       -- Assessment answers and scores

-- Asset management  
media                -- File uploads and metadata
```

### 📁 File Structure
```
src/
├── app/(lms)/lms/                    # LMS route group
│   ├── dashboard/                    # Author dashboard and analytics
│   ├── courses/                      # Course management interface
│   │   ├── new/                      # Course creation wizard
│   │   └── [courseId]/               # Course editing and content management
│   ├── learn/                        # Student learning interface
│   │   └── [courseSlug]/             # Course consumption
│   └── settings/                     # Tenant configuration
│
├── components/lms/                   # LMS-specific React components
│   ├── blocks/                       # Content block renderers
│   │   ├── TextRichRenderer.tsx      # Rich text display
│   │   ├── VideoRenderer.tsx         # Video playback
│   │   ├── QuizRenderer.tsx          # Interactive quizzes
│   │   └── ...                       # Additional block types
│   ├── editor/                       # Content authoring tools
│   │   ├── BlockInspector.tsx        # Block property editor
│   │   ├── TiptapLessonEditor.tsx    # Rich text editor
│   │   └── MediaUploader.tsx         # Asset upload interface
│   └── shared/                       # Reusable LMS components
│
├── lib/lms/                          # Business logic and utilities
│   ├── actions.ts                    # Server actions for data operations
│   ├── supabase.ts                   # Database client configuration
│   ├── blocks/                       # Block type definitions
│   │   ├── schemas.ts                # Zod validation schemas
│   │   └── types.ts                  # TypeScript interfaces
│   └── utils.ts                      # Helper functions
│
└── types/supabase.lms.ts             # Generated database types
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase project configured
- Environment variables properly set

### 1. Installation & Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 2. Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: For enhanced features
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
STRIPE_SECRET_KEY=sk_test_...
UPLOADTHING_SECRET=sk_live_...
```

### 3. Database Setup

```bash
# Apply LMS schema migrations
supabase db push

# Seed with sample data (optional)
npm run db:seed
```

### 4. Start Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Content Block System

### Available Block Types

1. **📝 Text Rich** - Rich text content with full formatting
2. **💬 Quote** - Styled quotations with optional citations  
3. **🖼️ Image** - Responsive images with captions and alt text
4. **🎥 Video** - Support for YouTube, Vimeo, Mux, and direct uploads
5. **📢 Callout** - Highlighted content boxes (note, warning, insight, theology)
6. **📎 Download** - File downloads with metadata and tracking
7. **❓ Quiz MCQ** - Multiple choice questions with explanations
8. **✅ Quiz T/F** - True/false assessments with feedback
9. **🔗 CTA** - Call-to-action buttons with custom styling

### Block Development Pattern

Each block follows a consistent pattern:

```typescript
// 1. Define the block schema
export const quoteBlockSchema = z.object({
  type: z.literal('quote'),
  id: z.string(),
  props: z.object({
    text: z.string().min(1, "Quote text is required"),
    cite: z.string().optional(),
    alignment: z.enum(['left', 'center', 'right']).default('left')
  }),
  createdAt: z.string(),
  updatedAt: z.string()
})

// 2. Create the renderer component
export function QuoteRenderer({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic">
      <p>{block.props.text}</p>
      {block.props.cite && (
        <cite className="text-sm text-muted-foreground">
          — {block.props.cite}
        </cite>
      )}
    </blockquote>
  )
}

// 3. Build the editor interface
export function QuoteEditor({ block, onChange }: BlockEditorProps<QuoteBlock>) {
  return (
    <div className="space-y-4">
      <Textarea
        value={block.props.text}
        onChange={(e) => onChange({
          ...block,
          props: { ...block.props, text: e.target.value }
        })}
        placeholder="Enter quote text..."
      />
      {/* Additional form controls */}
    </div>
  )
}
```

## 👥 User Roles & Permissions

### Tenant-Level Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to tenant settings, user management, and all courses |
| **Editor** | Create, edit, and publish courses; manage content and media |
| **Viewer** | Read-only access to published courses and analytics |

### Course-Level Access

| User Type | Access Level |
|-----------|--------------|
| **Course Authors** | Full edit access to their courses |
| **Enrolled Learners** | Access to published lessons and progress tracking |
| **Public Users** | No access to draft or private content |

## 🔧 API Reference

### Server Actions

#### Course Management
```typescript
// Create a new course with metadata
createCourse(data: CourseInsert): Promise<Course>

// Update existing course details
updateCourse(id: string, data: CourseUpdate): Promise<Course>

// Permanently delete a course and all content
deleteCourse(id: string): Promise<void>

// Publish/unpublish course
toggleCourseStatus(id: string, status: 'draft' | 'published'): Promise<Course>
```

#### Module & Lesson Operations
```typescript
// Create module within a course
createModule(data: ModuleInsert): Promise<Module>

// Reorder modules via drag-and-drop
reorderModules(courseId: string, moduleIds: string[]): Promise<void>

// Create lesson within a module  
createLesson(data: LessonInsert): Promise<Lesson>

// Update lesson content blocks
updateLessonBlocks(lessonId: string, blocks: Block[]): Promise<void>
```

#### Enrollment & Progress Tracking
```typescript
// Enroll student in course
enrollInCourse(courseId: string): Promise<Enrollment>

// Update lesson completion status
updateLessonProgress(
  lessonId: string, 
  status: 'not_started' | 'in_progress' | 'completed'
): Promise<LessonProgress>

// Get course progress summary
getCourseProgress(courseId: string): Promise<ProgressSummary>
```

## 🎨 Customization & Theming

### Tenant-Specific Styling
Each tenant can customize their LMS appearance:

```typescript
interface TenantTheme {
  colors: {
    primary: string      // Brand primary color
    secondary: string    // Accent color
    background: string   // Background color
    foreground: string   // Text color
  }
  typography: {
    fontFamily: string   // Custom font family
    scale: number        // Typography scale multiplier
  }
  layout: {
    radius: number       // Border radius
    maxWidth: string     // Content max width
  }
  branding: {
    logo?: string        // Logo URL
    favicon?: string     // Favicon URL
  }
}
```

### Custom Block Development

To create new block types:

1. **Define Schema** in `/lib/lms/blocks/schemas.ts`
2. **Create Renderer** in `/components/lms/blocks/`
3. **Build Editor Interface** in `/components/lms/editor/`
4. **Register Block** in the block registry
5. **Add to Block Picker** for content creation

## 🔒 Security & Privacy

### Row Level Security (RLS)
All database operations are protected by comprehensive RLS policies:

- **Tenant Isolation**: Users can only access their organization's data
- **Role-Based Access**: Actions are restricted based on user roles
- **Content Privacy**: Draft content is only visible to authors
- **Student Privacy**: Progress data is private to individual learners

### Data Validation
- **Client-Side**: Zod schemas validate all form inputs
- **Server-Side**: Server actions re-validate all data before database operations
- **Database Level**: Foreign key constraints and check constraints ensure data integrity

## ⚡ Performance Optimization

### Frontend Performance
- **Server-Side Rendering**: SSR for SEO and initial load performance
- **Code Splitting**: Dynamic imports for editor components to reduce bundle size
- **Image Optimization**: Next.js Image component with Supabase storage CDN
- **Caching Strategy**: React Query for client-side caching with stale-while-revalidate

### Database Performance
- **Query Optimization**: Efficient queries with proper indexing
- **Connection Pooling**: Supabase handles connection management
- **Real-time Updates**: Supabase subscriptions for live collaboration
- **Batch Operations**: Bulk updates for better performance

## 🚀 Deployment Guide

### Production Checklist

- [ ] **Environment Variables**: All required env vars configured
- [ ] **Database Migrations**: Latest schema applied
- [ ] **Storage Buckets**: Media buckets created with proper policies
- [ ] **RLS Policies**: All security policies enabled and tested
- [ ] **Custom Domain**: Domain configured with SSL
- [ ] **Analytics**: Tracking and monitoring setup
- [ ] **Error Reporting**: Error boundary and logging configured

### Deployment Steps

```bash
# 1. Build the application
npm run build

# 2. Test the production build locally
npm start

# 3. Deploy to your hosting platform
# (Vercel, Netlify, Railway, etc.)

# 4. Run post-deployment verification
npm run test:e2e
```

## 🛠️ Development Workflow

### Code Standards
- **TypeScript**: Strict mode with comprehensive type coverage
- **ESLint**: Extended Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting with pre-commit hooks
- **Testing**: Unit tests with Jest, integration tests with Playwright

### Git Workflow
1. Create feature branch from `main`
2. Implement feature with tests
3. Ensure all tests pass and linting is clean
4. Submit pull request with detailed description
5. Code review and approval required
6. Merge to `main` triggers deployment

## 📊 Monitoring & Analytics

### Performance Monitoring
- **Web Vitals**: Core Web Vitals tracking for user experience
- **Database Performance**: Query performance monitoring via Supabase
- **Error Tracking**: Comprehensive error logging and alerting
- **User Analytics**: Learning engagement and completion metrics

### Business Metrics
- **Course Completion Rates**: Track learner success
- **Content Performance**: Most/least engaging content
- **User Engagement**: Time spent learning, return visits
- **Revenue Tracking**: Course sales and subscription metrics

## 🤝 Support & Contributing

### Getting Help
- **Documentation**: Comprehensive guides and API reference
- **Community**: Discord community for developers and users
- **Support**: Email support for technical issues
- **Training**: Video tutorials and onboarding materials

### Contributing Guidelines
1. **Fork Repository**: Create your own fork for development
2. **Feature Branches**: Use descriptive branch names
3. **Commit Messages**: Follow conventional commit format
4. **Pull Requests**: Include tests and documentation updates
5. **Code Review**: All changes require review and approval

## 📈 Roadmap

### Upcoming Features
- **Advanced Analytics**: Detailed learning analytics dashboard
- **AI-Powered Content**: Automated content suggestions and improvements
- **Mobile Apps**: Native iOS and Android applications
- **Integration APIs**: Third-party integrations (Zoom, Slack, etc.)
- **White Label**: Full white-label solution for enterprises

### Long-term Vision
- **Global Localization**: Multi-language support
- **Advanced Assessments**: Sophisticated testing and certification
- **Live Learning**: Virtual classrooms and webinar integration
- **Marketplace**: Course marketplace with revenue sharing

---

**Built with ❤️ for the future of online learning**

This LMS system represents a comprehensive approach to digital education, combining modern web technologies with thoughtful user experience design to create engaging learning experiences.
