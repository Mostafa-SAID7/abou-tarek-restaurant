# Styling System

## Tailwind CSS

This project uses **Tailwind CSS** for all styling. No scoped CSS or inline styles.

### Configuration Files

- `tailwind.config.js` — Design tokens (colors, spacing, typography)
- `src/assets/styles/globals.css` — Global utilities and components
- `postcss.config.js` — CSS processing

### Design Tokens

**Colors:**
```javascript
primary: '#c81030'        // Brand red
gold: '#f5a623'           // Accent gold
error: '#dc2626'
success: '#16a34a'
warning: '#f59e0b'
neutral: 50-950           // Gray scale
```

**Spacing:** 0.5px → 96px (4px grid)

**Typography:** xs → 8xl (fluid sizing)

**Breakpoints:**
- `sm` — 640px (mobile)
- `md` — 768px (tablet)
- `lg` — 1024px (desktop)
- `xl` — 1280px (wide)
- `2xl` — 1536px (ultra-wide)

### Global Components

Pre-built component classes in `globals.css`:

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger">Danger</button>

<!-- Cards -->
<div class="card">
  <h3 class="card-title">Title</h3>
  <p>Content...</p>
</div>

<!-- Badges -->
<span class="badge">Label</span>

<!-- Modal -->
<div class="modal-overlay">
  <div class="modal">Content</div>
</div>

<!-- Alerts -->
<div class="alert alert-info">Info message</div>
```

## Component Conventions

### Naming
- `App*` — Global app-level components
- PascalCase for all component names
- Descriptive, concise names

### File Structure

```
components/
├── AppIcon.vue          # SVG icon wrapper
├── AppLoader.vue        # Loading screen
├── AppToast.vue         # Toast notifications
├── LoadingSpinner.vue   # Spinner component
└── ...
```

### Example Component

```vue
<template>
  <button class="btn btn-primary" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: String,
  variant: { type: String, default: 'primary' }
})

defineEmits(['click'])
</script>

<!-- No <style> — use Tailwind classes only -->
```

## Troubleshooting

### Styles Not Applying
- Check spelling of Tailwind classes
- Verify custom tokens in `tailwind.config.js`
- Ensure `globals.css` is imported in `main.js`
- Run `npm run build` to see CSS errors
