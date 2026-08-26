# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/compare/v1.0.0...v1.0.1) (2026-08-26)


### Bug Fixes

* install dependencies before Vercel deployment ([686be43](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/commit/686be43e5927f1267b152ec41a4318670484d4e9))
* postcss CommonJS syntax and missing autoprefixer ([2be6f39](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/commit/2be6f398ca02be9c6c51df340eacedc2edcdfb42))
* remove app running placeholder from application shell ([c060735](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/commit/c060735671902cc22e08d7d2d840bbe8b80893b2))
* remove initial loading screen and fix app initialization ([73c868d](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/commit/73c868d0394961c7504ab96f18bb2a796cdfec36))
* switch deployment from Netlify to Vercel ([63abb3c](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/commit/63abb3cf8e88000350b07a86228b2be27340950e))
* validate Vercel secrets and align deployment with Node 20 ([9e5b958](https://github.com/Mostafa-SAID7/abou-tarek-restaurant/commit/9e5b958a4811e6761f411c1ec736ab0349b2d894))

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
