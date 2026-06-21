# Features

## Core Features

- ✅ **Public SPA** — No authentication or admin features
- ✅ **Zero Backend** — All data in localStorage
- ✅ **Responsive Design** — Mobile, tablet, desktop optimized
- ✅ **Dark Mode** — Light/dark theme toggle
- ✅ **Bilingual** — Arabic & English with RTL/LTR support
- ✅ **Modern Stack** — Vue 3 + Tailwind CSS + Vite

## Pages

- 🏠 **Landing** (`/`) — Hero section, about, news, reviews, stats
- 🍽️ **Menu** (`/menu`) — Full menu with categories
- ℹ️ **About** (`/about`) — Brand story and history
- 📰 **News** (`/news`) — Blog/news posts
- 📧 **Contact** (`/contact`) — Contact info & form
- 404 **Not Found** — Fallback page

## Technical Features

### Dark Mode
- Automatic theme detection
- Manual toggle button
- Persistent localStorage preference

### Accessibility
- ✅ Semantic HTML (`<section>`, `<nav>`, `<article>`)
- ✅ ARIA labels (`aria-label`, `aria-live`)
- ✅ Keyboard navigation
- ✅ Color contrast (WCAG AA)
- ✅ Focus management
- ✅ Screen reader support

### Performance
- Code splitting by route
- Image optimization (WebP)
- CSS purging (Tailwind)
- No external CDNs
- **Total Bundle**: ~95KB gzipped

### PWA Ready
- Service worker support
- Web manifest
- Installable on mobile

## Testing Accessibility

```bash
# Check issues
npm run audit:a11y

# Manual testing
# - Use axe DevTools browser extension
# - Test keyboard navigation
# - Test with screen reader (NVDA, JAWS)
```

## Dark Mode Testing

Toggle in browser console:
```javascript
document.documentElement.setAttribute('data-theme', 'dark')
document.documentElement.setAttribute('data-theme', 'light')
```
