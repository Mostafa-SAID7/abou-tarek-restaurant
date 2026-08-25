# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> public navigation >> renders the not-found page for unknown routes
- Location: tests/e2e/navigation.spec.js:22:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "404"
Received string:    "الصفحة غير موجودة"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    9 × locator resolved to <h1 data-v-661cc224="" class="notfound-title">الصفحة غير موجودة</h1>
      - unexpected value "الصفحة غير موجودة"

```

```yaml
- heading "الصفحة غير موجودة" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const routes = ['/', '/menu', '/branches', '/about', '/news', '/contact'];
  4  | 
  5  | test.describe('public navigation', () => {
  6  |   for (const route of routes) {
  7  |     test(`renders ${route}`, async ({ page }) => {
  8  |       await page.goto(route, { waitUntil: 'domcontentloaded' });
  9  |       await expect(page.locator('main#main-content')).toBeVisible();
  10 |       await expect(page.locator('header.navbar')).toBeVisible();
  11 |       await expect(page.locator('footer.app-footer')).toBeVisible();
  12 |     });
  13 |   }
  14 | 
  15 |   test('navigates to the menu from the main navigation', async ({ page }) => {
  16 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  17 |     await page.locator('a.nav-link[href="/menu"]').click();
  18 |     await expect(page).toHaveURL(/\/menu$/);
  19 |     await expect(page.locator('.menu-hero')).toBeVisible();
  20 |   });
  21 | 
  22 |   test('renders the not-found page for unknown routes', async ({ page }) => {
  23 |     await page.goto('/does-not-exist', { waitUntil: 'domcontentloaded' });
> 24 |     await expect(page.locator('h1')).toContainText('404');
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  25 |     await expect(page.locator('a[href="/"]')).toBeVisible();
  26 |   });
  27 | 
  28 |   test('exposes keyboard and landmark accessibility basics', async ({ page }) => {
  29 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  30 |     await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main-content');
  31 |     await expect(page.locator('nav[aria-label]')).toBeVisible();
  32 |     await expect(page.locator('main#main-content')).toHaveAttribute('id', 'main-content');
  33 |     await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
  34 |   });
  35 | });
  36 | 
  37 | test.describe('preferences and menu filtering', () => {
  38 |   test('switches language and direction', async ({ page }) => {
  39 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  40 |     await page.locator('.lang-toggle').click();
  41 |     await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  42 |     await expect(page.locator('.nav-link').first()).toContainText('Home');
  43 |   });
  44 | 
  45 |   test('switches dark mode', async ({ page }) => {
  46 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  47 |     await page.locator('button.dark-btn').click();
  48 |     await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  49 |   });
  50 | 
  51 |   test('filters menu items by search', async ({ page }) => {
  52 |     await page.goto('/menu', { waitUntil: 'domcontentloaded' });
  53 |     const search = page.locator('input.search-input');
  54 |     await search.fill('koshary');
  55 |     await expect(page.locator('.filtered-section')).toBeVisible();
  56 |     await expect(page.locator('.result-count')).toBeVisible();
  57 |   });
  58 | });
  59 | 
```