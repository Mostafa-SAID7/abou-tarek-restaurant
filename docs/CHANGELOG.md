# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-21

### Added
- ✨ Initial release
- 🎨 Tailwind CSS integration with design tokens
- 💾 localStorage-based data management
- 🌍 Bilingual support (Arabic/English) with RTL/LTR
- 🌓 Dark mode toggle with automatic detection
- 📱 Fully responsive design (mobile, tablet, desktop)
- ♿ WCAG AA accessibility compliance
- 🚀 Performance optimized (~95KB gzipped)
- 📖 Comprehensive documentation
- 🐳 Docker support
- 🚀 Vercel deployment automation
- ✅ GitHub Actions CI/CD

### Pages
- Landing page with hero, about, news, reviews, stats
- Menu page with category filtering
- About page with brand story
- News page with blog posts
- Contact page with form and information
- 404 Not Found fallback

### Components
- App header with navigation
- Footer with links and contact
- Menu cards with image, price, description
- News cards with date and excerpt
- Branch cards with location and hours
- Testimonials section
- Toast notifications
- Loading spinners
- Skeleton loaders

### Features
- Menu search and filtering
- Favorites/bookmarks
- Branch location display
- Dark/Light theme toggle
- Language switching (AR/EN)
- Responsive navigation
- Mobile-optimized UI

### Infrastructure
- Vue 3 with Composition API
- Vite build tool
- Tailwind CSS styling
- Pinia state management
- Vue Router client-side routing
- ESLint code linting
- Prettier code formatting

## [Unreleased]

### Planned
- [ ] Professional i18n (vue-i18n)
- [ ] Analytics integration
- [ ] PWA improvements
- [ ] E2E testing
- [ ] Storybook components
- [ ] Admin panel (separate project)
- [ ] API integration
- [ ] CMS integration

---

## How to Update

When making changes, add entries to the [Unreleased] section following this format:

```markdown
### Added
- New feature description

### Changed
- Modified feature description

### Fixed
- Bug fix description

### Removed
- Removed feature description
```

Then when releasing a new version, move [Unreleased] entries to a new version section with the date.
