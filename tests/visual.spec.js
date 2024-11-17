const { test, expect } = require("@playwright/test");

test.describe("Basic Visual Tests", () => {
  test("header should be visible", async ({ page }) => {
    // Navigate to the page
    await page.goto("https://news.ycombinator.com/newest");
    await page.waitForLoadState("networkidle");

    // Check if header exists and is visible
    const header = page.locator(".hnname");
    await expect(header).toBeVisible();

    // Log success message
    console.log("Header visibility check completed");
  });

  test("navigation links should be present", async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");
    await page.waitForLoadState("networkidle");

    // Check for common navigation elements
    const navLinks = page.locator(".pagetop a");
    const count = await navLinks.count();

    // Log the count of navigation links found
    console.log(`Found ${count} navigation links`);

    // Ensure we have at least some navigation links
    expect(count).toBeGreaterThan(0);
  });

  test("page title should be correct", async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");

    // Check page title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    expect(title).toContain("Hacker News");
  });
});
