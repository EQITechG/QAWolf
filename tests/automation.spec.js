const { test, expect } = require("@playwright/test");
const { isSortedDescending } = require("../utils/compareTimeStamps");

test.describe("Hacker News Automation Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");
    await page.waitForLoadState("networkidle");
  });

  test("should automatically validate article sorting daily", async ({
    page,
  }) => {
    const timeStamps = [];

    while (timeStamps.length < 100) {
      const ageElements = page.locator(".age");
      const currentTimeStamps = await ageElements.evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("title").split(" ")[0])
      );
      timeStamps.push(...currentTimeStamps);

      if (timeStamps.length >= 100) break;

      await page.locator(".morelink").click();
      await page.waitForTimeout(3000);
    }

    const firstHundredTimeStamps = timeStamps.slice(0, 100);
    expect(firstHundredTimeStamps).toHaveLength(100);
    expect(isSortedDescending(firstHundredTimeStamps)).toBeTruthy();
  });

  test("should capture performance metrics", async ({ page }) => {
    const metrics = await page.evaluate(() =>
      JSON.stringify(window.performance.timing)
    );
    console.log("Performance Metrics:", metrics);

    const navigationTiming = await page.evaluate(() => ({
      navigationStart: performance.timing.navigationStart,
      loadEventEnd: performance.timing.loadEventEnd,
      loadTime:
        performance.timing.loadEventEnd - performance.timing.navigationStart,
    }));

    expect(navigationTiming.loadTime).toBeLessThan(10000);
  });
});
