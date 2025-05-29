const puppeteer = require('puppeteer');

exports.scrapeGFGProfile = async (username) => {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(`https://auth.geeksforgeeks.org/user/${username}/`);

    const stats = await page.evaluate(() => {
      const problemsSolved = document.querySelector('.score_card_value')?.innerText.trim() || 'N/A';
      return { problemsSolved };
    });

    return stats;
  } catch (error) {
    console.error('GFG scraping error:', error.message);
    throw new Error('Failed to fetch GFG stats');
  } finally {
    await browser.close();
  }
};
