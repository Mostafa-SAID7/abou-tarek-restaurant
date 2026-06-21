# Project Architecture

## Directory Structure

```
src/
├── main.js                      # App entry point
├── App.vue                      # Root component
│
├── data/                        # Centralized data layer
│   ├── branches.json            # Restaurant locations
│   ├── menu.json                # Menu items
│   ├── pages.json               # Static content
│   └── seed.js                  # Initialize localStorage
│
├── services/
│   ├── storage.js               # localStorage wrapper
│   └── modules/
│       ├── branchService.js
│       ├── menuService.js
│       └── pageService.js
│
├── stores/
│   ├── menuStore.js             # Menu state (Pinia)
│   ├── pageStore.js             # Pages state
│   └── toastStore.js            # Toast notifications
│
├── router/
│   └── index.js                 # Route definitions
│
├── views/
│   ├── LandingView.vue          # Home page
│   ├── MenuView.vue
│   ├── AboutView.vue
│   ├── NewsView.vue
│   ├── ContactView.vue
│   └── NotFoundView.vue
│
├── components/                  # Reusable components
│   ├── AppIcon.vue
│   ├── AppLoader.vue
│   ├── AppToast.vue
│   └── ...
│
├── layouts/
│   └── DefaultLayout.vue
│
├── composables/
│   ├── useLanguage.js           # i18n composable
│   ├── useDarkMode.js           # Dark mode toggle
│   └── ...
│
└── assets/
    └── styles/
        └── globals.css          # Tailwind setup

public/                          # Static assets
```

## Data Layer

### Storage Services

```javascript
import { branchService, menuService, pagesService } from '@/services'

// Get all branches
const branches = branchService.getAll()

// Find by ID
const downtown = branchService.getById('downtown')

// Get menu by category
const koshary = menuService.getByCategory('koshary')

// Get static pages
const about = pagesService.getSection('about')
```

### localStorage Keys

```javascript
app:branches        // Restaurant locations
app:menu            // Menu items
app:pages           // Static content
app:theme           // Dark mode preference (light/dark)
app:language        // Language preference (en/ar)
app:favorites       // Saved items
```

## State Management (Pinia)

- **menuStore** — Menu items and filters
- **pageStore** — Page content state
- **toastStore** — Notification management

## Routing

Main routes:
- `/` — Landing page
- `/menu` — Menu display
- `/about` — About page
- `/news` — News/blog
- `/contact` — Contact info & form
- `*` — 404 Not Found

## Tech Stack

- **Vue 3** — Progressive framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Pinia** — State management
- **Vue Router** — Client-side routing
- **Axios** — HTTP client (optional)
