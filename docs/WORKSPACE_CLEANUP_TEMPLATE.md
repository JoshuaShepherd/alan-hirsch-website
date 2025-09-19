# 🧹 Workspace Documentation Cleanup Template

## Purpose
This template provides a systematic approach for cleaning up development workspaces that have accumulated extensive documentation during rapid prototyping and feature development phases. Use this when your project has evolved from exploration to production focus.

## 🚨 Pre-Cleanup Assessment

Before starting, answer these questions:
1. **What is the current primary focus of this project?** (e.g., content website, LMS platform, e-commerce site)
2. **Which documentation reflects the current architecture vs. experimental features?**
3. **Are there any business documents mixed with technical docs?**
4. **What is the difference between "archive" vs "delete" for your team?**

## 📋 Cleanup Checklist

### Phase 1: Delete Obsolete Files ❌

#### **Loose SQL/Database Files** (Root Directory)
```bash
# Look for files like:
- database-setup.sql
- database-setup-minimal.sql
- schema-backup.sql
- old-migrations.sql
```
**Action**: DELETE if superseded by proper migration system
**Reason**: Ad-hoc setup files become maintenance burdens

#### **Empty or Placeholder Files**
```bash
# Find empty files:
find . -name "*.md" -size 0
find . -name "*error-log*" -size -100c
```
**Action**: DELETE empty files with no content value

#### **Business Documents in Code**
```bash
# Look for:
- *.html invoices
- *.pdf contracts  
- *receipt* files
- *invoice* files
```
**Action**: MOVE to `/docs/business/` or DELETE if not needed

#### **Duplicate Migration Files**
```bash
# Compare files like:
- 001_create_schema.sql vs 20241206_001_schema.sql
- old_rls_policies.sql vs new_rls_policies.sql
```
**Action**: Keep the newer, properly dated versions

### Phase 2: Organize Documentation 📁

#### **Create Standardized Directory Structure**
```
docs/
├── archive/           # Completed experiments & old approaches
├── setup-guides/      # Database, auth, deployment setup
├── development/       # Developer tools, frameworks, integrations  
├── design/            # UI/UX, design systems, style guides
├── content/           # Content strategy, editorial guidelines
├── strategy/          # Business strategy, planning docs
└── business/          # Invoices, contracts, non-technical docs
```

#### **High-Priority Relocations**

##### **Archive Directory** (`docs/archive/`)
Move completed experiments and outdated approaches:
```markdown
# Characteristics of "archive" content:
- LMS features (if main project is now content site)
- Platform valuation docs (if no longer seeking investment)  
- Comprehensive audits from early development
- "WORKING_STATUS" docs for completed features
- Alternative implementation approaches not chosen

# Examples:
- LMS_WORKING_STATUS.md
- COMPREHENSIVE_PLATFORM_AUDIT.md  
- PLATFORM_VALUATION_EVIDENCE.md
- COMPLETE_DATABASE_IMPLEMENTATION_PLAN.md
```

##### **Setup Guides Directory** (`docs/setup-guides/`)
Technical setup and configuration docs:
```markdown
# Characteristics:
- Database setup procedures
- Authentication configuration  
- Deployment instructions
- Environment setup guides

# Examples:
- SUPABASE_AUTH_SETUP_GUIDE.md
- AUTH_IMPLEMENTATION_COMPLETE.md
- DATABASE_SETUP_COMPLETE.md
```

##### **Development Directory** (`docs/development/`)
Developer tools and technical integration guides:
```markdown
# Characteristics:
- Framework integration guides
- AI/ML implementation docs  
- Third-party tool setup
- Developer workflow docs

# Examples:
- AGENTS_IMPLEMENTATION_GUIDE.md
- TIPTAP_GUIDE.md
- VENDOR_DIRECTORY_GUIDE.md
```

##### **Design Directory** (`docs/design/`)
UI/UX and visual design documentation:
```markdown
# Characteristics:
- Design system documentation
- Component library guides
- Theme and styling docs
- UI framework instructions

# Examples:
- DESIGN_SYSTEM_BRIEF.md
- DARK_LIGHT_MODE_GUIDE.md
- ACETERNITY_VORTEX_GUIDE.md
```

##### **Content Directory** (`docs/content/`)
Content strategy and editorial guidelines:
```markdown
# Characteristics:
- Content creation workflows
- Editorial guidelines
- Content strategy docs
- Publishing procedures

# Examples:
- CONTENT_CREATION_STRATEGY.md
- CREATOR_READER_UX_GUIDE.md
- SITE_CONTENT_AUDIT.md
```

##### **Strategy Directory** (`docs/strategy/`)
Business strategy and planning documentation:
```markdown
# Characteristics:
- Strategic planning docs
- Site architecture planning
- Navigation strategies
- Product roadmaps

# Examples:
- STRATEGIC_DEVELOPMENT_GUIDE.md
- SITE_NAVIGATION_INDEX.md
- WEBSITE_PAGE_INDEX.md
```

### Phase 3: Route and Code Cleanup 🗂️

#### **Identify Out-of-Scope Routes**
```bash
# In src/app/, look for directories that may not align with current project:
- (lms)/ or lms-*/ directories (if main project is not LMS)
- admin/ (if overly complex for current needs)
- test-*/ directories (development/testing routes)
- *-example-old/ directories
- dev-*/ directories
```

#### **Testing and Development Routes to Remove**
```markdown
Common development routes to clean up:
- /test-db/
- /test-setup/  
- /dev-signin/
- /no-auth-testing/
- /verify-content/
- /home-example-old/
```

## 🚀 Execution Commands

### Create Directory Structure
```bash
mkdir -p docs/{archive,setup-guides,development,design,content,strategy,business}
```

### Mass File Operations
```bash
# Move multiple files (adjust paths as needed):
mv FILE1.md FILE2.md FILE3.md docs/archive/
mv SUPABASE_*.md AUTH_*.md docs/setup-guides/
mv *_GUIDE.md *_IMPLEMENTATION.md docs/development/
```

### Verify Structure
```bash
tree docs/  # or ls -la docs/ if tree not available
```

## ✅ Success Metrics

After cleanup, you should have:
- **Root directory**: Only essential files (README.md, package.json, configs)
- **Documentation**: Organized in logical categories  
- **Clear distinction**: Between active vs archived content
- **Reduced cognitive load**: Easier to find relevant docs
- **Better onboarding**: New developers can navigate more easily

## 🔍 Final Review Questions

1. **Can a new developer understand the project structure in 5 minutes?**
2. **Is it clear which features are active vs experimental?**  
3. **Are business docs separated from technical docs?**
4. **Would you be comfortable showing this workspace to a client/investor?**
5. **Are there any remaining files that don't serve the current project goals?**

## 📝 Customization Notes

**Adjust this template based on your project type:**
- **E-commerce sites**: May need `/docs/payments/`, `/docs/inventory/`
- **SaaS platforms**: May need `/docs/api/`, `/docs/integrations/`
- **Content sites**: May emphasize `/docs/content/`, `/docs/seo/`
- **Educational platforms**: May keep LMS docs in active directories

**Remember**: The goal is clarity and maintainability, not perfection. Adapt the structure to serve your team's actual workflow.