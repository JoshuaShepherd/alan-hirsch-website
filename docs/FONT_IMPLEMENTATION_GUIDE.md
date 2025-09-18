# Academic Sophisticate Font Stack - Implementation Guide

## Overview

The Alan Hirsch platform now uses the **Academic Sophisticate** font stack, designed for exceptional readability in theological and leadership content while maintaining intellectual authority.

## Font Stack Configuration

### Primary Fonts
- **Display/Headings**: Crimson Pro → Source Serif 4 → Charter → Georgia → serif
- **Body Text**: Inter → Source Sans 3 → system-ui → sans-serif  
- **Monospace**: JetBrains Mono → SF Mono → Monaco → monospace

### CSS Variables
```css
--font-display: Primary serif stack for headings
--font-body: Primary sans-serif stack for body text
--font-serif-alt: Source Serif 4 fallback
--font-sans-alt: Source Sans 3 fallback  
--font-mono: Monospace stack for code
```

## Utility Classes

### Core Font Classes
```css
.font-display    /* Headings - Crimson Pro + fallbacks */
.font-body       /* Body text - Inter + fallbacks */
.font-mono       /* Code/technical - JetBrains Mono + fallbacks */
```

### Specialized Classes
```css
.font-quote      /* Italic serif for blockquotes */
.font-ui         /* Medium weight sans for UI elements */
.font-caption    /* Small muted text for captions */
.font-label      /* Medium weight small text for labels */
```

### Long-form Reading
```css
.prose-enhanced  /* Optimized typography for books/articles */
```

## Usage Guidelines

### ✅ Best Practices
1. **Use CSS variables/tokens** - Always use `font-display`, `font-body`, etc.
2. **Semantic application** - Headings use `font-display`, body uses `font-body`
3. **Consistent hierarchy** - Follow established typography scale
4. **Specialized contexts** - Use `font-quote` for pullquotes, `font-mono` for code

### ❌ Avoid
1. **Hardcoded font-family** - Never use inline font declarations
2. **Inconsistent fallbacks** - Always use the complete stack
3. **Missing font weights** - Ensure weights are loaded for all fonts

## Typography Scale

### Headings (font-display)
- `text-display-xl`: 3-5rem (Hero headings)
- `text-display-lg`: 2.5-4rem (Page titles)  
- `text-display-md`: 2-3rem (Section headers)
- `h1`: 2.5-4rem (clamp)
- `h2`: 2-3rem (clamp)
- `h3`: 1.5-2rem (clamp)

### Body Text (font-body)
- `text-body-lg`: 1.25rem (Lead paragraphs)
- `text-body`: 1.125rem (Standard reading)
- `text-body-sm`: 1rem (Captions, metadata)

## Implementation Status

### ✅ Completed
- [x] Updated `layout.tsx` with enhanced font imports
- [x] Added CSS font stack definitions
- [x] Created specialized utility classes  
- [x] Fixed hardcoded email template fonts
- [x] Added fallback fonts for better reliability
- [x] Maintained existing component compatibility

### 📋 Component Usage Pattern
All existing components using `font-display` and `font-body` classes will automatically inherit the new font stack without requiring code changes.

## Performance Optimization

### Font Loading Strategy
- `display: 'swap'` for all fonts
- Subset loading (`latin` only)
- Strategic font weights (400, 500, 600)
- System font fallbacks to prevent layout shift

### Bundle Impact
- **Added fonts**: Source Serif 4, Source Sans 3, JetBrains Mono
- **Total additional**: ~150KB (compressed)
- **Performance**: Minimal impact due to selective loading

## Design Language

**"Scholarly Modernism"** - Clean typography that signals intellectual rigor while remaining approachable. The serif headings anchor intellectual tradition while sans-serif body text ensures accessibility across all devices and reading conditions.

### Visual Characteristics
- High contrast between display and body fonts
- Generous white space and breathing room  
- Subtle color palette that doesn't compete with text
- Typography that scales beautifully from mobile to desktop
- Clear information hierarchy through font weight and size

## Troubleshooting

### Font Not Loading
1. Check CSS variable definition in `globals.css`
2. Verify font import in `layout.tsx`
3. Ensure component uses correct utility class

### Performance Issues
1. Fonts should load with `display: swap`
2. Check network tab for font loading times
3. Verify fallback fonts are available

### Layout Shift
1. Use `font-display: swap` (already configured)
2. Ensure similar x-heights between font families
3. Test fallback rendering

## Testing Checklist

- [ ] Headings render with Crimson Pro
- [ ] Body text renders with Inter
- [ ] Fallback fonts work without JavaScript
- [ ] Mobile typography scaling works correctly
- [ ] Dark mode typography contrast is adequate
- [ ] Long-form content is readable
- [ ] Code blocks use monospace font
