# Test Suite Documentation

## Overview
This test suite validates the Hacker News article sorting functionality using Playwright with automated testing capabilities.

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

4. **Automation Tests** (automation.spec.js)
   - Scheduled test execution
   - Performance monitoring
   - Automated reporting

### Running Tests
- All tests: `npm test`
- UI Mode: `npm run test:ui`
- Debug Mode: `npm run test:debug`
- Visual Tests: `npm run test:visual`
- Automation Tests: `npm run test:automation`
- CI Pipeline: `npm run test:ci`
- Generate Report: `npm run report`

### CI/CD Integration
Tests automatically run on:
- Every 6 hours (scheduled)
- Push to main branch
- Pull request creation
- Manual trigger via GitHub Actions

### Automated Features
1. **Scheduled Testing**
   - Runs every 6 hours
   - Validates article sorting
   - Monitors performance metrics
   - Generates test reports

2. **Performance Monitoring**
   - Page load timing
   - Navigation metrics
   - Resource loading stats

3. **Error Handling**
   - Automatic retry on failure
   - Error screenshots
   - Detailed error logging
   - GitHub Issue creation on failure

4. **Reporting**
   - HTML test reports
   - JSON performance metrics
   - Visual regression results
   - Artifact storage in GitHub

### Project Structure
- `/tests` - Test specifications
- `/utils` - Helper functions
- `/test-reports` - Generated reports
- `/.github/workflows` - CI/CD configuration

### Environment Setup
1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Configure environment variables (if needed)
4. Run tests using provided npm scripts

### Best Practices
- Write atomic tests
- Include error handling
- Add meaningful assertions
- Document test cases
- Maintain visual snapshots
- Monitor test performance

### Troubleshooting
1. Check test reports in playwright-report/
2. Review error screenshots
3. Verify GitHub Actions logs
4. Check network conditions
5. Validate test data

For detailed implementation, refer to the test files in the `/tests` directory.