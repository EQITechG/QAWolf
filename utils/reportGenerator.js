const fs = require('fs');
const path = require('path');

class TestReportGenerator {
  constructor() {
    this.results = [];
  }

  addResult(testName, status, duration, error = null) {
    this.results.push({
      testName,
      status,
      duration,
      error,
      timestamp: new Date().toISOString()
    });
  }

  generateReport() {
    const report = {
      summary: {
        total: this.results.length,
        passed: this.results.filter(r => r.status === 'passed').length,
        failed: this.results.filter(r => r.status === 'failed').length
      },
      tests: this.results,
      generatedAt: new Date().toISOString()
    };

    const reportDir = path.join(process.cwd(), 'test-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const reportPath = path.join(reportDir, `report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return reportPath;
  }
}

module.exports = TestReportGenerator; 