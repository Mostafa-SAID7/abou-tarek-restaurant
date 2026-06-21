# Contributing to Koshary Abou Tarek

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Code of Conduct

Be respectful, inclusive, and professional. Harassment or discrimination will not be tolerated.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue list.

When you create a bug report, include:
- Clear description of what the bug is
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment info (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! When creating one, include:
- Clear description of the enhancement
- Use case and benefits
- Possible implementation approach
- Examples of similar features elsewhere

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

PR guidelines:
- Follow code style guidelines (see below)
- Include tests for new features
- Update documentation if needed
- Keep commits atomic and logical
- Write clear PR description

## Code Style Guide

### Formatting

We use Prettier for consistent formatting:

```bash
npm run format
```

Config: `.prettierrc`
- Print width: 100
- Tab width: 2
- Single quotes
- Trailing commas: es5
- Vue indent: false

### Linting

We use ESLint to catch errors:

```bash
npm run lint
```

Config: `.eslintrc.js`
- Extends Vue 3 recommended
- No console in production
- No v-html except where safe

### Vue 3 Best Practices

- Use Composition API (script setup)
- Prefer const over let
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and reusable

### Example Component

```vue
<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <p>{{ description }}</p>
    <button class="btn btn-primary" @click="handleClick">
      {{ label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  label: { type: String, default: 'Click me' },
})

defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>
```

### File Structure

```
src/
├── components/     # Reusable components (PascalCase)
├── views/          # Page components (PascalCase)
├── stores/         # Pinia stores
├── services/       # Business logic
├── composables/    # Vue composables (useXxx)
├── utils/          # Utility functions
└── assets/         # Styles, images, fonts
```

### Naming Conventions

- Components: `PascalCase` (Button.vue, MenuCard.vue)
- Composables: `useXxx` (useDarkMode.js, useLanguage.js)
- Services: `camelCase` (branchService.js)
- Constants: `UPPER_CASE` (API_URL, MAX_ITEMS)
- Private methods: `_methodName` or prefix with $

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Type

- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code refactoring
- `docs` — Documentation
- `style` — Code style changes
- `test` — Adding tests
- `perf` — Performance improvement
- `chore` — Build, dependencies

### Subject

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at end
- Max 50 characters

### Body (Optional)

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

Reference issues:
```
Closes #123
Fixes #456
Related to #789
```

### Examples

```
feat: add dark mode toggle

Add ability to toggle between light and dark themes.
Theme preference persists in localStorage.

Closes #42

---

fix: correct menu item price display

Update price formatting to handle decimal values correctly.
Fixes issue where prices with cents weren't displaying.

Fixes #88

---

docs: update installation instructions

Add Node.js version requirement and troubleshooting section.

Related to #100
```

## Development Workflow

```bash
# Clone repository
git clone https://github.com/Mostafa-SAID7/restaurant-vue3.git
cd restaurant-vue3

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature

# Start development server
npm run serve

# Make changes and test

# Run linter
npm run lint

# Format code
npm run format

# Commit changes
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Open Pull Request on GitHub
```

## Testing

Test your changes:
- ✅ Dev server runs without errors
- ✅ No console errors/warnings
- ✅ Responsive design works (test at sm, md, lg, xl)
- ✅ Dark mode toggles correctly
- ✅ Language switching works
- ✅ Accessibility features work
- ✅ No linting errors

## Questions?

Feel free to:
- Open an issue with question label
- Reach out via email: info@aboutarek.com
- Check existing documentation first

## Recognition

Contributors will be recognized in:
- CHANGELOG.md
- GitHub contributors page
- Project documentation

Thank you for contributing! 🙏
