const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.codechef.com/users/${username}`, { waitUntil: 'domcontentloaded' });

    // Scrape user profile data
    const profileData = await page.evaluate(() => {
      const name = document.querySelector('.user-details-container header h2')?.innerText || 'N/A';
      const rating = document.querySelector('.rating-number')?.innerText || 'N/A';
      const globalRank = document.querySelector('section.rating-data-section div.rating-ranks ul li:nth-child(1) strong')?.innerText || 'N/A';
      const countryRank = document.querySelector('section.rating-data-section div.rating-ranks ul li:nth-child(2) strong')?.innerText || 'N/A';

      // Extract the number of problems solved
      const fullSolved = document.querySelector('section.problems-solved h5:nth-child(1)')?.innerText.match(/\d+/)?.[0] || 0;
      const partialSolved = document.querySelector('section.problems-solved h5:nth-child(2)')?.innerText.match(/\d+/)?.[0] || 0;
      const totalSolved = parseInt(fullSolved) + parseInt(partialSolved);

      // Extract the number of contests participated
      const contests = Array.from(document.querySelectorAll('.rating-data-section table tbody tr'))
        .map(row => row.cells[0]?.innerText).filter(Boolean); // Get the contest names
      const contestsParticipated = contests.length;

      return {
        name,
        rating,
        globalRank,
        countryRank,
        problemsSolved: {
          fullSolved: parseInt(fullSolved),
          partialSolved: parseInt(partialSolved),
          totalSolved,
        },
        contestsParticipated
      };
    });

    await browser.close();

    res.json(profileData); // Return all scraped profile data including problems and contests
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch CodeChef profile' });
  }
});

module.exports = router;
