# Test Suite Documentation

## Overview
This test suite validates the Hacker News article sorting functionality using Playwright.

### Test Categories
1. **Functional Tests** (hackerNews.spec.js)
   - Timestamp collection
   - Sorting validation
   - Data format validation

2. **Edge Cases** (edgeCases.spec.js)
   - Empty page handling
   - Malformed data handling
   - Network error scenarios

3. **Visual Tests** (visual.spec.js)
   - Homepage layout
   - Timestamp element visibility

### Running Tests
- All tests: `npm test`
- UI Mode: `npm run test:ui`
- Debug Mode: `npm run test:debug`
- Update Visual Snapshots: `npm run test:visual`

### CI/CD Integration
Tests automatically run on:
- Push to main branch
- Pull request creation
- Manual trigger via GitHub Actions 