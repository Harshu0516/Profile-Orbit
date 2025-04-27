const puppeteer = require('puppeteer');

exports.scrapeGFGProfile = async (username) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://auth.geeksforgeeks.org/user/${username}/`);

  // Example: Extract basic details
  const stats = await page.evaluate(() => {
    const problemsSolved = document.querySelector('.score_card_value').innerText;
    return { problemsSolved };
  });

  await browser.close();
  return stats;
};
