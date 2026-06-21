# Deployment

## Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

## Deployment Options

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

- Automatic deployments on push
- Preview deployments for PRs
- Serverless functions support

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir dist
```

- Easy drag-and-drop deployment
- Built-in CI/CD
- Form submissions support

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
FROM node:18-alpine as builder
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
