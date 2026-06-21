# Docker Deployment

## Quick Start

### Build Docker Image

```bash
docker build -t restaurant-app .
```

### Run Container

```bash
docker run -p 80:80 restaurant-app
```

Visit: http://localhost

### Using Docker Compose

```bash
docker-compose up -d
```

Stop:
```bash
docker-compose down
```

## Docker Configuration

### Dockerfile
- Multi-stage build (builder + nginx)
- Node 18 Alpine for small size
- Nginx for production serving
- Health checks included
- Gzip compression configured

### nginx.conf
- SPA routing (serve index.html for all routes)
- Cache headers for assets (1 year)
- Cache busting for HTML (no cache)
- Gzip compression
- Security headers
- Deny access to hidden files

## Environment Variables

```dockerfile
NODE_ENV=production
```

## Building for Production

```bash
# Build image
docker build -t restaurant-app:1.0.0 .

# Tag for Docker Hub
docker tag restaurant-app:1.0.0 yourusername/restaurant-app:1.0.0

# Push to registry
docker push yourusername/restaurant-app:1.0.0
```

## Container Health

Check container status:
```bash
docker ps
```

View logs:
```bash
docker logs restaurant-app
```

## Performance Tips

- Alpine images are ~5MB vs 300MB for full images
- Multi-stage builds reduce final image size
- Nginx efficiently serves static files
- Health checks ensure container quality

## Security

- Run as non-root (nginx default)
- Minimal base image (Alpine)
- Security headers configured
- CORS properly handled
- No sensitive data in image
