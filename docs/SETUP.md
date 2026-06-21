# Setup & Installation

## Prerequisites
- Node.js 16+
- npm or yarn

## Quick Start

```bash
# Clone repository
git clone https://github.com/Mostafa-SAID7/restaurant-vue3.git
cd restaurant-vue3

# Install dependencies
npm install

# Start development server
npm run serve
```

**Development URL**: http://localhost:5000

## Available Scripts

```bash
# Start dev server
npm run serve

# Build for production
npm run build

# Lint code
npm run lint

# Format code (Prettier)
npm run format
```

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Try different port
npm run serve -- --port 3000
```

### Build Issues
- Check Node.js version: `node --version`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `npm ci`
