# Test User System

This system provides pre-configured test accounts for development and testing of the Alan Hirsch website and LMS platform.

## Quick Setup

1. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Create Test Users & Content**
   - Visit: http://localhost:3000/admin/test-users
   - Click "Create Sample Content" to add courses
   - Click "Create Test Users" to add accounts

## Test Accounts

| Email | Password | Role | Access Level |
|-------|----------|------|--------------|
| `test@alanhirsch.com` | `TestUser123!` | Owner | Full platform access |
| `facilitator@alanhirsch.com` | `Facilitator123!` | Facilitator | Course management & cohorts |
| `leader@alanhirsch.com` | `Leader123!` | Leader | Content creation & groups |
| `participant@alanhirsch.com` | `Participant123!` | Participant | Learning content access |
| `admin@alanhirsch.com` | `Admin123!` | Global Admin | All administrative functions |

## Features Available for Testing

### 🎓 Learning Management System (LMS)
- **Courses**: 3 sample courses with different complexity levels
- **Modules**: Structured learning paths with objectives
- **Progress Tracking**: User progress through courses
- **Assessments**: Interactive learning components

### 👥 User Management
- **Authentication**: Supabase-powered sign in/up
- **Role-based Access**: Different permissions per user type
- **Profile Management**: User preferences and settings
- **APEST Profiles**: Leadership intelligence assessments

### 🚀 Movement Building Tools
- **Organizations**: Multi-tenant structure
- **Cohorts**: Group learning experiences
- **Experiments**: Practice-based learning
- **Community Features**: Discussion and collaboration

### 📊 Content Management
- **Course Creation**: Build structured learning paths
- **Content Types**: Video, text, assessments, uploads
- **Version Control**: Track content changes
- **Publishing Workflow**: Draft → Review → Published states

## API Endpoints

### User Management
- `POST /api/auth/test-users` - Create all test users
- `GET /api/auth/test-users` - List existing test users
- `DELETE /api/auth/test-users` - Delete all test users

### Authentication
- `POST /api/auth/signin` - Sign in with email/password
- `POST /api/auth/signup` - Create new user account

### Content Management
- `POST /api/admin/sample-content` - Create sample courses
- `GET /api/admin/sample-content` - List courses
- `DELETE /api/admin/sample-content` - Delete sample content

## Key Pages to Test

### Public Pages
- `/` - New homepage with LMS preview
- `/auth/login` - Sign in page
- `/auth/signup` - Registration page
- `/membership` - Subscription plans

### Authenticated Pages
- `/lms/dashboard` - Main LMS dashboard
- `/lms/courses` - Course catalog
- `/lms/courses/[courseId]` - Course detail
- `/profile` - User profile management
- `/admin/test-users` - Test user management (development only)

### LMS Features
- `/lms/courses/new` - Course creation (facilitator+)
- `/lms/movemental/dashboard` - Organization dashboard
- `/lms/auth` - LMS authentication flow

## Testing Scenarios

### 1. New User Journey
1. Visit homepage
2. Click "Start Learning" 
3. Sign up with new account
4. Explore LMS dashboard
5. Enroll in a course
6. Complete lessons and assessments

### 2. Facilitator Workflow
1. Sign in as facilitator
2. Create new course
3. Add modules and lessons
4. Publish course
5. Create cohort
6. Manage enrollments

### 3. Movement Leader Path
1. Sign in as leader
2. Access movement tools
3. Create experiments
4. Track progress
5. Generate reports

### 4. Cross-Role Collaboration
1. Owner creates organization
2. Facilitator creates courses
3. Leader runs cohorts
4. Participants engage with content
5. All roles interact in community features

## Development Notes

- **Database**: Uses Supabase with full schema defined in `/src/types/movemental-lms.ts`
- **Authentication**: Supabase Auth with custom session management
- **Permissions**: Role-based access control throughout
- **Content**: Rich content types with interactive components
- **Responsive**: Mobile-first design with Tailwind CSS

## Security

- Test users are only created in development mode
- Service role key required for user management
- Session cookies are httpOnly and secure
- All endpoints validate environment and permissions

## Troubleshooting

### "Service role key not configured"
Add `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` file.

### "Database connection failed"
Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct.

### "Test users already exist"
Users are created with upsert logic - existing users will be updated, not duplicated.

### Build errors
Run `npm run build` to check for TypeScript errors. Most CSS warnings are expected (Tailwind directives).

---

**Note**: This test system is designed for development use only. Never use these test accounts or passwords in production environments.
