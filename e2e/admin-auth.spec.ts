import { test, expect } from '@playwright/test';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wrong-password-placeholder';

// Helper: fills password and waits for the submit button to be enabled before clicking
async function submitLogin(page: any, password: string) {
  await page.fill('input[type="password"]', password);
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.waitFor({ state: 'visible' });
  await expect(submitButton).toBeEnabled({ timeout: 5000 });
  await submitButton.click();
}

test.describe('Admin authentication flow', () => {

  test('wrong password shows an error and does not redirect', async ({ page }) => {
    await page.goto('/admin/login');
    await submitLogin(page, 'definitely-wrong-password-123');

    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.locator('text=/invalid password/i')).toBeVisible({ timeout: 5000 });
  });

  test('correct password redirects to dashboard', async ({ page }) => {
    await page.goto('/admin/login');
    await submitLogin(page, ADMIN_PASSWORD);

    await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 10000 });
  });

  test('session persists across multiple refreshes', async ({ page }) => {
    await page.goto('/admin/login');
    await submitLogin(page, ADMIN_PASSWORD);
    await expect(page).toHaveURL(/\/admin\/dashboard/);

    for (let i = 0; i < 3; i++) {
      await page.reload();
      await expect(page).toHaveURL(/\/admin\/dashboard/);
    }
  });

  test('direct navigation to dashboard without login redirects to login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 });

    await context.close();
  });

  test('logout clears session and blocks further dashboard access', async ({ page }) => {
    await page.goto('/admin/login');
    await submitLogin(page, ADMIN_PASSWORD);
    await expect(page).toHaveURL(/\/admin\/dashboard/);

    await page.click('text=/sign out/i');

    // Wait for the sign-out action to actually complete (redirect to login)
    // before attempting to re-access the dashboard
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 });

    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 10000 });
  });

});