const { test, expect } = require('@playwright/test');

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
    await page.waitForLoadState('networkidle');
  });

  test('homepage should match snapshot', async ({ page }) => {
    // Wait for the page to fully load
    await page.goto('https://news.ycombinator.com/newest');
    await page.waitForLoadState('networkidle');
    
  
    // Wait for .itemlist to be visible
    try {
      await page.waitForSelector('.itemlist', { state: 'visible', timeout: 30000 });
    } catch (error) {
      console.error('.itemlist was not found or not visible within 30s.');
      throw error;
    }
  
    // Wait for .age to appear
    await page.waitForSelector('.age', { state: 'visible', timeout: 30000 });
  
    // Proceed with snapshot testing
    try {
      await expect(page).toHaveScreenshot('homepage.png', {
        maxDiffPixelRatio: 0.2,
        threshold: 0.7,
        animations: 'disabled',
      });
    } catch (error) {
      await page.screenshot({ path: 'debug-homepage.png' });
      throw error;
    }
  });
  

  test('article timestamps should be visible', async ({ page }) => {
    // Wait for the '.age a' selector to appear
    await page.waitForSelector('.age a', { state: 'visible', timeout: 10000 });
  
    // Log the count of `.age` elements
    const count = await page.locator('.age').count();
    console.log(`Found ${count} elements with class 'age'`);
    if (count === 0) {
      console.error('No .age elements found on the page');
      console.log('DOM:', await page.content());
      throw new Error('No .age elements present.');
    }
  
    // Validate visibility of the first `.age` element
    const ageElement = page.locator('.age').first();
    await expect(ageElement).toBeVisible({ timeout: 10000 });
  
    // Validate the nested <a> tag inside the `.age` element
    const ageLink = ageElement.locator('a');
    await expect(ageLink).toBeVisible({ timeout: 10000 });
  
    // Log the `title` attribute for debugging
    const title = await ageElement.getAttribute('title');
    console.log(`First .age title attribute: ${title}`);
    if (!title) {
      throw new Error('.age element is missing the title attribute');
    }
  
    // Ensure visibility and scroll to the element
    await ageElement.scrollIntoViewIfNeeded();
  
    // Validate the screenshot
    await expect(ageElement).toHaveScreenshot('timestamp.png', {
      maxDiffPixelRatio: 0.3,
      threshold: 0.8,
    });
  });
  
});
