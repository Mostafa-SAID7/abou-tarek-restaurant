# Deployment

## Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

## Deployment Options

### Vercel (Recommended)

The `Deploy to Vercel` GitHub Actions workflow deploys the `main` branch after the build passes. Create a GitHub Environment named `production` and add these environment secrets:

- `VERCEL_TOKEN` — a Vercel access token
- `VERCEL_ORG_ID` — the Vercel team or account ID
- `VERCEL_PROJECT_ID` — the Vercel project ID

The workflow uses Node.js 20 and the pinned Vercel CLI. It validates all three secrets before running, builds a prebuilt deployment, and then publishes it to production.

For a local deployment:

```bash
npm i -g vercel
vercel --prod
```

- Automatic production deployments on pushes to `main`
- Preview deployments can be configured through Vercel Git integration
- Serverless functions support

### GitHub Pages

```bash
# Update vue.config.js with repo name
npm run build
git add dist
git commit -m "build: production"
git push
```

### Docker

```dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

Run with Docker:

```bash
docker build -t restaurant-app .
docker run -p 80:80 restaurant-app
```

## Environment Variables

Create `.env.production` for production settings:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Koshary Abou Tarek
```

## Performance Checklist

- ✅ Bundle size < 100KB gzipped
- ✅ LCP < 2.5s
- ✅ FCP < 1s
- ✅ CLS < 0.1
- ✅ All images optimized (WebP)
- ✅ Cache headers configured

## Pre-Deployment Verification

```bash
# Build successfully
npm run build

# No linting errors
npm run lint

# All components render
npm run serve -- --mode production

# Accessibility OK
npm run audit:a11y
```
