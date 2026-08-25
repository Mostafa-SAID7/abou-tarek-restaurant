import { test, expect } from '@playwright/test';

const routes = ['/', '/menu', '/branches', '/about', '/news', '/contact'];

test.describe('public navigation', () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('header.navbar')).toBeVisible();
      await expect(page.locator('footer.app-footer')).toBeVisible();
    });
  }

  test('navigates to the menu from the main navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('a.nav-link[href="/menu"]').click();
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.locator('.menu-hero')).toBeVisible();
  });
});

test.describe('preferences and menu filtering', () => {
  test('switches language and direction', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('.lang-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('.nav-link').first()).toContainText('Home');
  });

  test('switches dark mode', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('button.dark-btn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('filters menu items by search', async ({ page }) => {
    await page.goto('/menu', { waitUntil: 'domcontentloaded' });
    const search = page.locator('input.search-input');
    await search.fill('koshary');
    await expect(page.locator('.filtered-section')).toBeVisible();
    await expect(page.locator('.result-count')).toBeVisible();
  });
});
