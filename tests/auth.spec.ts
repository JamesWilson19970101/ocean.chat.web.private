import { test, expect } from '@playwright/test';
import { v7 as uuidv7 } from 'uuid';

/**
 * Black-Box E2E Test for Authentication Flows.
 * Verifies Registration, Login, Token Refresh, and Redirects against the live Next.js application.
 */
test.describe('Authentication E2E (Black-Box)', () => {
  test('should register, login, refresh token silently, and redirect correctly', async ({
    page,
  }) => {
    // Generate unique credentials for this test run
    const username = `testuser_${uuidv7().substring(0, 8)}`;
    const password = 'Password123!';

    // ==========================================
    // 1. REGISTER FLOW
    // ==========================================
    await page.goto('/register');

    // Intercept register API to verify it's called successfully
    const registerPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/auth/register') && response.status() === 200,
    );

    // Fill in registration form
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);

    // Click submit (handles both english and translated button text if any)
    await page.getByRole('button', { name: /提交/i }).click();

    // Verify API was called
    await registerPromise;

    // Verify auto-redirect to login page
    await expect(page).toHaveURL(/\/login/);

    // ==========================================
    // 2. LOGIN FLOW & AUTO-REDIRECT
    // ==========================================
    const loginPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/auth/login') && response.status() === 200,
    );

    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    await page
      .getByRole('button', { name: /submit|register|注册|提交|登录|login/i })
      .click();

    // Verify API was called
    await loginPromise;

    // Verify auto-redirect to /chat after successful login
    await expect(page).toHaveURL(/\/chat/);

    // ==========================================
    // 3. SILENT TOKEN REFRESH FLOW
    // ==========================================
    // F5 Reload: In-memory accessToken will be lost, but HttpOnly refresh_token cookie remains.
    // Our AppBootstrapProvider should detect the missing token and automatically call /auth/refresh.
    const refreshPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/auth/refresh') && response.status() === 200,
    );

    await page.reload();

    // Verify silent refresh API was called successfully on boot
    await refreshPromise;

    // Ensure we are still on the protected /chat route and did NOT get kicked out to /login
    await expect(page).toHaveURL(/\/chat/);
  });
});
