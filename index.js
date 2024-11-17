// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { isSortedDescending } = require("./utils/compareTimeStamps");

async function sortHackerNewsArticles() {
    // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  try{
  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  await page.waitForSelector(".age");

  //Collect timestamps from 100 articles
  const timeStamps = [];
  while (timeStamps.length < 100) {
  const ageElements = page.locator(".age");
  const currentTimeStamps = await ageElements.evaluateAll((elements) =>
    elements.map((el) => el.getAttribute("title").split(" ")[0])
  );
  timeStamps.push(...currentTimeStamps);

  if (timeStamps.length >= 100) break;
  await page.locator(".morelink").click();
  await page.waitForTimeout(3000)
}
const firstHundredTimeStamps = timeStamps.slice(0, 100);
const isSorted = isSortedDescending(firstHundredTimeStamps);
 if (isSorted) {
   console.log("✅ Success: All 100 articles are correctly sorted from newest to oldest!");
 } else {
   console.log("❌ Error: Articles are not correctly sorted from newest to oldest!");
 }
  }catch(error){
    console.error('Test failed with error:', {
      message: error.message,
      location: error.stack,
      timestamp: new Date().toISOString()
    });
    throw error;
  }finally{
    await browser.close();
  }
}

(async () => {
  await sortHackerNewsArticles();
})();
