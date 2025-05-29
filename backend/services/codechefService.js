const puppeteer = require('puppeteer');

exports.fetchCodechefStats = async (username) => {
  const url = `https://www.codechef.com/users/${username}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // For server environments
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const stats = await page.evaluate(() => {
      const getText = (selector) =>
        document.querySelector(selector)?.innerText.trim() || 'N/A';

      const getRank = (index) => {
        const items = document.querySelectorAll('ul.rating-ranks li strong');
        return items[index]?.innerText.trim() || 'N/A';
      };

      return {
        rating: getText('.rating-number'),
        stars: getText('.rating-star'),
        globalRank: getRank(0),
        countryRank: getRank(1),
        fullySolved: getText('section.problems-solved h5'),
      };
    });

    return stats;
  } catch (error) {
    console.error('CodeChef scraping error:', error.message);
    throw new Error('Failed to fetch CodeChef stats');
  } finally {
    await browser.close();
  }
};
