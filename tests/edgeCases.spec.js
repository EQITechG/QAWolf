const { test, expect } = require('@playwright/test');
const { isSortedDescending } = require('../utils/compareTimeStamps');

test.describe('Edge Cases', () => {
  test('should handle empty page gracefully', async ({ page }) => {
    // Mock empty response
    await page.route('https://news.ycombinator.com/newest', async route => {
      await route.fulfill({
        status: 200,
        body: '<html><body></body></html>'
      });
    });
    
    await page.goto('https://news.ycombinator.com/newest');
    const ageElements = await page.locator('.age').count();
    expect(ageElements).toBe(0);
  });

  test('should handle malformed dates', () => {
    const malformedTimestamps = [
      'invalid-date',
      '2023-13-45T25:61:99', // invalid date parts
      '2023-12-20T10:00:00'
    ];
    
    expect(() => isSortedDescending(malformedTimestamps)).toThrow();
  });
}); 