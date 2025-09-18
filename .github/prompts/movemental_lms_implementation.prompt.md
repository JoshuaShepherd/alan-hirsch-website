# Movemental Thinking LMS: Complete Implementation Checklist

## Executive Summary
Build a cohort-based LMS for "Movemental Thinking for Network Leaders (Advanced)" that operationalizes Alan Hirsch's movement theology into practical, reproducible systems. This 12-16 week course transforms leaders from institutional managers to movement catalysts through Framework → Practice → System progression.

## Core Design Principles
- **Movement Operating System**: Not static content but lived practice at scale
- **mDNA Integration**: Jesus is Lord, disciple-making, missional-incarnational impulse, APEST, organic systems, communitas
- **Cohort-Based Learning**: Peer accountability, case clinics, 90-day experiments
- **Network Scalability**: White-label resources, reproducible systems, cultural translation
- **EdTech Aesthetic**: Modern minimalist with bold accents, modular cards, PP Agrandir typography

## Technical Stack
- **Frontend**: Next.js 15 + TypeScript + Tailwind + shadcn/ui
- **Content**: Tiptap editor with custom schemas (Canvas, Checklists, Rubrics)
- **Backend**: Supabase (Auth, Postgres, RLS, Storage)
- **AI**: OpenAI Agents for coaching prompts and content adaptation
- **Design**: Dark/light surfaces, lime highlight (#D3F26A), modular card system

---

## Database Schema Implementation

### Core Tables (LMS Schema)
```sql
-- Organizations & Users
organizations: id, name, region, metadata, created_at
users: id, org_id, role[owner|facilitator|leader|participant], apest_primary, profile_json
user_profiles: id, user_id, bio, avatar_url, timezone, preferences_json

-- Course Structure  
courses: id, title, slug, level, summary, outcomes_json, duration_weeks, status
modules: id, course_id, order, title, summary, learning_objectives, framework_content
lessons: id, module_id, order, title, media_refs, reading_refs, hirsch_excerpt_md, duration_minutes
components: id, lesson_id, type[video|reading|reflection|activity|quiz|canvas|upload], config_json, content_json

-- Cohort Management
cohorts: id, org_id, course_id, start_date, end_date, facilitator_id, schedule_json, max_participants
enrollments: id, cohort_id, user_id, role[facilitator|participant], status, enrolled_at
cohort_sessions: id, cohort_id, session_number, scheduled_at, type[teaching|coaching|clinic], zoom_link

-- Movement-Specific Features
experiments: id, cohort_id, owner_id, title, hypothesis, practice_type[LTG|DBS|Oikos|APEST|Contextualization], 
            start_date, end_date, status, metrics_json, results_json
checkins: id, experiment_id, date, progress_score, blockers_text, learnings_text, next_steps
apest_profiles: id, user_id, apostolic, prophetic, evangelistic, shepherding, teaching, assessment_date
team_apest_matrix: id, cohort_id, data_json, generated_at
mdna_assessments: id, org_id, jesus_lord, disciple_making, missional_incarnational, apest_score, 
                  organic_systems, communitas, assessment_date, scores_json

-- Learning & Assessment
submissions: id, component_id, user_id, content_json, file_url, rubric_scores_json, submitted_at, status
progress_tracking: id, user_id, lesson_id, status[not_started|in_progress|completed], time_spent, completed_at
discussion_threads: id, cohort_id, title, created_by, created_at
discussion_posts: id, thread_id, user_id, content, attachments_json, posted_at

-- Resources & Tools
resources: id, module_id, type[slide|guide|card|canvas_template|toolkit], title, description, 
           file_url, editable, download_count
toolkits: id, name, type[APEST360|MovementOS|DiscipleMaking|GlocalGospel], components_json, usage_count

-- Analytics & Multiplication
multiplication_nodes: id, cohort_id, type[group|leader|community], parent_id, created_by, title, 
                     metrics_json, created_at
analytics_snapshots: id, cohort_id, date, movemental_scorecard_json, apest_balance_json, 
                    practice_adoption_json, multiplication_metrics_json
```

### Key Relationships & RLS Policies
- **Multi-tenancy**: All data scoped by organization_id with RLS
- **Role-based access**: Owner > Facilitator > Leader > Participant hierarchy
- **Cohort isolation**: Participants only see their cohort data
- **Resource sharing**: Templates copyable across organizations

---

## Course Content Structure

### Course: Movemental Thinking for Network Leaders (Advanced)
**Duration**: 16 weeks | **Format**: Cohort-based | **Target**: Network leaders

#### Module 1: Movemental Paradigm - Waking the Church to Apostolic Genius
**Framework**: Christendom vs Movement paradigm, mDNA introduction
**Practice**: Communitas lab (low-risk adventure challenge)
**System**: Movement OS Canvas v1 (map mDNA presence/gaps)
**Lessons**: 
1. The Great Forgetting: Why Movements Die
2. Apostolic Genius Rediscovered  
3. mDNA: The Six Elements
4. From Institution to Movement

#### Module 2: Jesus is Lord - Allegiance and Organizing Principle  
**Framework**: Mission as organizing principle, allegiance over attendance
**Practice**: Allegiance rhythms, rule of life development
**System**: Covenanting practices in Movement OS
**Lessons**:
1. Jesus is Lord: More Than Personal Savior
2. Mission as DNA, Not Department
3. Organizing Around the King
4. Allegiance Rhythms Workshop

#### Module 3: APEST as Movement Algorithm
**Framework**: Fivefold functionality, apostolic centrality
**Practice**: APEST 360 assessment, team mapping
**System**: Balanced APEST leadership teams
**Lessons**:
1. The Fivefold Reconsidered
2. Apostolic Centrality for Movement
3. APEST Team Dynamics
4. Functional Team Design

#### Module 4: Disciple-Making and Reproducibility
**Framework**: From converts to disciple-makers, counter-consumerism
**Practice**: LTGs, Discovery Bible, oikos mapping
**System**: Reproducible disciple-making systems
**Lessons**:
1. The Disciple-Making Crisis
2. Life Transformation Groups (LTGs)
3. Discovery Bible Study Method
4. Oikos Network Mapping

#### Module 5: Missional-Incarnational Impulse
**Framework**: Attractional to incarnational, everyday mission
**Practice**: Neighborhood presence experiments
**System**: Micro-mission labs and feedback loops
**Lessons**:
1. Beyond Attractional Church
2. Incarnational Presence
3. Questionable Lives That Attract
4. Micro-Mission Design

#### Module 6: Organic Systems and Movement Operating System
**Framework**: Church as living system, reproducible structures
**Practice**: Open systems design, feedback loops
**System**: Movement OS Canvas v2, operating rhythms
**Lessons**:
1. Organic vs Institutional Systems
2. Movement Killers and Remedies
3. Feedback Loops for Growth
4. Scaling Without Killing

#### Module 7: Cultural Translation and the "Glocal" Gospel
**Framework**: Guilt-shame-fear frames, contextual gospel
**Practice**: Contextual gospel labs, story adaptation
**System**: Contextualization library and field cards
**Lessons**:
1. Beyond One-Dimensional Gospel
2. Guilt, Shame, Fear Cultural Frames
3. Story Translation Workshop
4. Contextual Ministry Tools

#### Module 8: Leading Change Beyond Christendom
**Framework**: De-institutionalizing, apostolic vs maintenance
**Practice**: Stakeholder mapping, resistance diagnosis
**System**: Change playbook, governance adjustments
**Lessons**:
1. The Christendom Captivity
2. Apostolic Leadership vs Management
3. Leading Paradigm Shifts
4. Change Strategy Development

#### Module 9: Global Movement Case Studies
**Framework**: Four levels of ecclesia, movement patterns
**Practice**: Comparative case analysis
**System**: Pattern library indexed to mDNA and APEST
**Lessons**:
1. Underground Church Movements
2. Megachurch to Movement Transitions
3. Network Multiplication Models
4. Black Swan Adaptability

#### Module 10: Integration and 90-Day Scaling Plan
**Framework**: Pilot to platform, sustainable systems
**Practice**: 90-day plan development and peer review
**System**: Network rollout playbook
**Lessons**:
1. From Learning to Leading
2. 90-Day Sprint Planning
3. Metrics That Matter
4. Network Multiplication Strategy

---

## Component Implementation Checklist

### 1. Database & Schema Setup
- [ ] Create `lms` schema in Supabase
- [ ] Implement all tables with proper relationships
- [ ] Set up RLS policies for multi-tenancy
- [ ] Create storage bucket `lms-assets`
- [ ] Generate TypeScript types

### 2. Authentication & User Management
- [ ] Supabase Auth integration
- [ ] Role-based access control (Owner/Facilitator/Leader/Participant)
- [ ] Organization creation and management
- [ ] User profile system with APEST preferences

### 3. Course Management System
- [ ] Course creation and editing interface
- [ ] Module and lesson structure management
- [ ] Content components (video, reading, reflection, activity, quiz, canvas)
- [ ] Hirsch excerpt integration system
- [ ] Resource library with downloadable toolkits

### 4. Cohort Management
- [ ] Cohort creation and scheduling
- [ ] Enrollment system
- [ ] Session management with Zoom integration
- [ ] Facilitator dashboard and tools

### 5. Movement-Specific Features
- [ ] APEST 360 assessment tool
- [ ] Movement OS Canvas (interactive Tiptap document)
- [ ] Experiment tracking system (LTG, DBS, Oikos, etc.)
- [ ] Check-in and reflection tools
- [ ] mDNA assessment dashboard

### 6. Learning Management
- [ ] Progress tracking system
- [ ] Assignment submission and grading
- [ ] Discussion forums and case clinics
- [ ] Peer coaching tools
- [ ] Rubric-based assessments

### 7. Analytics & Reporting
- [ ] Movemental Scorecard dashboard
- [ ] APEST team heatmaps
- [ ] Multiplication tree visualization
- [ ] Practice adoption metrics
- [ ] Network-wide reporting

### 8. UI/UX Implementation
- [ ] EdTech aesthetic with modular cards
- [ ] Dark/light theme system
- [ ] Responsive design for all devices
- [ ] PP Agrandir typography integration
- [ ] Lime accent color system (#D3F26A)

### 9. Content Management
- [ ] Tiptap editor with custom schemas
- [ ] Canvas templates for exercises
- [ ] Checklist and rubric components
- [ ] Media upload and management
- [ ] Version control for resources

### 10. AI Integration
- [ ] OpenAI Agents for coaching prompts
- [ ] Content adaptation wizards
- [ ] Rubric evaluation assistance
- [ ] Contextual recommendations

### 11. Toolkits and Resources
- [ ] APEST 360 with visualization
- [ ] Movement OS Canvas templates
- [ ] Disciple-Making Starter Kit
- [ ] Glocal Gospel Library
- [ ] White-label customization tools

### 12. Testing & Quality Assurance
- [ ] Unit tests for core functionality
- [ ] Integration tests for user flows
- [ ] Performance optimization
- [ ] Accessibility compliance (WCAG AA)
- [ ] Mobile responsiveness

---

## Implementation Priority Order

### Phase 1: Foundation (Weeks 1-2)
1. Database schema and RLS setup
2. Authentication system
3. Basic UI framework with design tokens
4. Organization and user management

### Phase 2: Core LMS (Weeks 3-4)
1. Course and module management
2. Lesson content system
3. Basic progress tracking
4. Cohort management

### Phase 3: Movement Features (Weeks 5-6)
1. APEST assessment system
2. Experiment tracking
3. Movement OS Canvas
4. Basic analytics

### Phase 4: Content & Tools (Weeks 7-8)
1. All 10 modules with lessons
2. Resource library
3. Toolkits implementation
4. Discussion system

### Phase 5: Advanced Features (Weeks 9-10)
1. AI integration
2. Advanced analytics
3. Multiplication tracking
4. Export/import tools

### Phase 6: Polish & Launch (Weeks 11-12)
1. UI/UX refinement
2. Performance optimization
3. Documentation
4. Beta testing and feedback

---

## Success Metrics

### Technical Metrics
- [ ] 100% TypeScript coverage
- [ ] <2s page load times
- [ ] 95%+ Lighthouse scores
- [ ] Zero critical security vulnerabilities

### User Experience Metrics
- [ ] <10s time to complete lesson
- [ ] >90% completion rate for enrolled users
- [ ] <3 clicks to access any resource
- [ ] Mobile-first responsive design

### Movement Metrics (Movemental Scorecard)
- [ ] Identity shift indicators tracking
- [ ] APEST balance measurements
- [ ] Practice adoption rates
- [ ] Multiplication tree growth
- [ ] Contextualization output counts

---

## Next Steps: Execute Implementation

1. **Start with Database Schema**: Create the complete LMS schema
2. **Build Authentication Flow**: Implement role-based access
3. **Create Course Structure**: Build the 10-module Movemental course
4. **Implement Movement Tools**: APEST, mDNA, experiments
5. **Design UI System**: EdTech aesthetic with cards and accents
6. **Add AI Features**: Coaching and content adaptation
7. **Test and Refine**: Ensure quality and performance

This comprehensive checklist captures all requirements from the attached files and provides a clear roadmap for building the Movemental Thinking LMS with full movement theology integration and modern EdTech design.
