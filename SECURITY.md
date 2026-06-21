# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes    |

## Reporting Security Vulnerabilities

**Do not** create public GitHub issues for security vulnerabilities.

Instead, email security concerns to: **info@aboutarek.com**

Please include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will:
- Confirm receipt within 24 hours
- Investigate and validate
- Develop and test fix
- Release security patch
- Credit reporter (if desired)

## Security Best Practices

### For Users

- Keep dependencies updated: `npm update`
- Use HTTPS for production deployment
- Enable CORS only for trusted origins
- Don't commit sensitive data (.env files)

### For Developers

- Never commit secrets or API keys
- Use `.env.local` for local configuration
- Add secrets to GitHub Actions via **Settings** → **Secrets**
- Run `npm audit` before deploying
- Keep Node.js and npm up to date

## Dependencies

Run security audit:
```bash
npm audit
```

Update dependencies:
```bash
npm audit fix
npm update
```

## Docker Security

- Run as non-root user (nginx default)
- Use official Alpine images (minimal attack surface)
- Scan images: `docker scan restaurant-app`
- Keep Docker updated

## Content Security Policy

Headers configured in `netlify.toml` and `nginx.conf`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## HTTPS

- Required in production
- Automatically configured on Netlify
- Use SSL certificates from Let's Encrypt (free)

## Accessibility & Security

- No hardcoded credentials
- No tracking without consent
- No CORS bypass techniques
- Proper error handling (no sensitive info in errors)

## Security Checklist

Before deploying to production:

- ✅ All dependencies up to date
- ✅ No console errors/warnings
- ✅ HTTPS enabled
- ✅ Security headers configured
- ✅ `.env` file NOT in git
- ✅ Secrets in environment variables
- ✅ CORS properly configured
- ✅ Input validation implemented
- ✅ No hardcoded sensitive data

## Updates

We monitor:
- GitHub security alerts
- npm audit warnings
- Node.js security updates
- Dependency updates

Check for updates: `npm outdated`

## Contact

For security inquiries: info@aboutarek.com
