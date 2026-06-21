# Internationalization (i18n)

## Current Setup

Manual i18n using `useLanguage()` composable:

```javascript
import { useLanguage } from '@/composables/useLanguage'

const { t, lang, isAR, toggle } = useLanguage()

// Usage in templates
<p>{{ t('مرحبا', 'Hello') }}</p>
```

### API

- `t(ar, en)` — Get translation by language
- `lang` — Current language code (ar/en)
- `isAR` — Boolean, true if Arabic
- `toggle()` — Switch languages

### localStorage

Language preference saved as:
```javascript
localStorage.setItem('koshary-lang', 'en') // or 'ar'
```

## RTL/LTR Support

When Arabic is active:
- Layout flips to right-to-left
- Text direction becomes RTL
- Margins and padding are mirrored

## Testing Languages

Toggle in browser console:
```javascript
localStorage.setItem('koshary-lang', 'en')
location.reload()

localStorage.setItem('koshary-lang', 'ar')
location.reload()
```

## Future: vue-i18n

Professional i18n implementation planned for next version:

```javascript
// After migration:
<p>{{ $t('common.welcome') }}</p>
<p>{{ $d(new Date(), 'long') }}</p>
```

Benefits:
- Structured translation files
- Date/number formatting
- Message formatting
- Pluralization support
