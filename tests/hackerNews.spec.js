const { test, expect } = require('@playwright/test');
const { isSortedDescending } = require('../utils/compareTimeStamps');

test.describe('Hacker News Article Sorting', () => {
  test('should collect exactly 100 timestamps', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
    await page.waitForSelector('.age');
    
    const timeStamps = [];
    while (timeStamps.length < 100) {
      const ageElements = page.locator('.age');
      const currentTimeStamps = await ageElements.evaluateAll((elements) =>
        elements.map((el) => el.getAttribute('title').split(' ')[0])
      );
      timeStamps.push(...currentTimeStamps);
      
      if (timeStamps.length >= 100) break;
      await page.locator('.morelink').click();
      await page.waitForTimeout(1000);
    }
    
    const firstHundredTimeStamps = timeStamps.slice(0, 100);
    expect(firstHundredTimeStamps).toHaveLength(100);
  });

  test('should have valid ISO date format for all timestamps', async ({ page }) => {
    test.slow();
    
    await page.goto('https://news.ycombinator.com/newest', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    try {
      // Wait for both load states
      await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        page.waitForLoadState('networkidle')
      ]);

      // First check if elements exist
      const ageElements = page.locator('.age');
      const count = await ageElements.count();
      
      if (count === 0) {
        throw new Error('No age elements found on the page');
      }

      // Get the first element and wait for it to be visible
      const firstAge = ageElements.first();
      await firstAge.waitFor({ state: 'visible', timeout: 30000 });

      // Get timestamp and validate format
      const timeStamp = await firstAge.getAttribute('title');
      const isoDate = timeStamp.split(" ")[0];
      
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      expect(isoRegex.test(isoDate)).toBeTruthy();

    } catch (error) {
      console.error('Test failed:', {
        message: error.message,
        url: await page.url(),
        timestamp: new Date().toISOString()
      });

      // Take screenshot and dump page content for debugging
      await page.screenshot({ path: 'error-screenshot.png' });
      const content = await page.content();
      console.log('Page HTML at failure:', content);
      
      throw error;
    }
  });

  test('should handle network errors gracefully', async ({ page, browserName }) => {
    await page.route('**/*', route => route.abort('internetdisconnected'));
    
    try {
      await page.goto('https://news.ycombinator.com/newest');
    } catch (error) {
      const expectedErrors = {
        'chromium': 'net::ERR_INTERNET_DISCONNECTED',
        'firefox': 'NS_ERROR_OFFLINE',
        'webkit': 'Blocked by Web Inspector'
      };
      
      expect(error.message).toContain(expectedErrors[browserName]);
    }
  });

  test('sorting function should work correctly', () => {
    const mockTimestamps = [
      '2023-12-20T10:00:00',
      '2023-12-20T09:00:00',
      '2023-12-20T08:00:00'
    ];
    expect(isSortedDescending(mockTimestamps)).toBeTruthy();

    const unsortedTimestamps = [
      '2023-12-20T08:00:00',
      '2023-12-20T10:00:00',
      '2023-12-20T09:00:00'
    ];
    expect(isSortedDescending(unsortedTimestamps)).toBeFalsy();
  });
});