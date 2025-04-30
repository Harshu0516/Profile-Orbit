const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    console.log('Launching browser for:', username);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Avoid sandbox issues
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    console.log('Navigating to:', `https://www.codechef.com/users/${username}`);
    const response = await page.goto(`https://www.codechef.com/users/${username}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    if (response.status() === 404 || (await page.$('.user-details-container')) === null) {
      throw new Error('User not found');
    }

    // Wait for key elements to ensure dynamic content loads
    await page.waitForSelector('.rating-number', { timeout: 10000 }).catch(() => console.log('Rating number not found'));
    await page.waitForSelector('.problems-solved', { timeout: 10000 }).catch(() => console.log('Problems solved section not found'));
    await page.waitForSelector('.rating-ranks', { timeout: 10000 }).catch(() => console.log('Ranks section not found'));

    const profileData = await page.evaluate(() => {
      const data = {};

      // Name
      data.name = document.querySelector('.user-details-container header h2')?.innerText.trim() || 'N/A';
      console.log('Name element:', document.querySelector('.user-details-container header h2')?.outerHTML || 'Not found');

      // Rating
      data.rating = document.querySelector('.rating-number')?.innerText.trim() || 'N/A';
      console.log('Rating element:', document.querySelector('.rating-number')?.outerHTML || 'Not found');

      // Ranks
      data.globalRank = document.querySelector('.rating-data-section .rating-ranks ul li:nth-child(1) strong')?.innerText.trim() || 'N/A';
      console.log('Global Rank element:', document.querySelector('.rating-data-section .rating-ranks ul li:nth-child(1) strong')?.outerHTML || 'Not found');
      data.countryRank = document.querySelector('.rating-data-section .rating-ranks ul li:nth-child(2) strong')?.innerText.trim() || 'N/A';
      console.log('Country Rank element:', document.querySelector('.rating-data-section .rating-ranks ul li:nth-child(2) strong')?.outerHTML || 'Not found');

      // Division
      const divisionElement = document.querySelector('.rating-data-section .user-details div'); // Adjust if needed
      data.division = divisionElement?.innerText.match(/Division\s*(\d+)/i)?.[1] || 'N/A';
      console.log('Division element:', divisionElement?.outerHTML || 'Not found');

      // Stars (inferred from rating or star images)
      const starsElement = document.querySelector('.rating-star'); // Adjust if stars are images
      data.stars = starsElement ? starsElement.innerText.match(/\d+/)?.[0] || 'N/A' : 'N/A';
      console.log('Stars element:', starsElement?.outerHTML || 'Not found');

      // Problems Solved
      const fullSolvedElement = document.querySelector('.problems-solved h5');
      const fullSolvedText = fullSolvedElement?.innerText || '0';
      const partialSolvedElement = fullSolvedElement?.nextElementSibling?.tagName === 'H5' ? fullSolvedElement.nextElementSibling : null;
      const partialSolvedText = partialSolvedElement?.innerText || '0';
      const fullSolved = parseInt(fullSolvedText.match(/\d+/)?.[0] || '0');
      const partialSolved = parseInt(partialSolvedText.match(/\d+/)?.[0] || '0');
      data.problemsSolved = {
        fullSolved,
        partialSolved,
        totalSolved: fullSolved + partialSolved,
      };
      console.log('Full Solved element:', fullSolvedElement?.outerHTML || 'Not found');
      console.log('Partial Solved element:', partialSolvedElement?.outerHTML || 'Not found');

      // Contests Participated
      const contestsTable = document.querySelector('.rating-data-section table tbody');
      data.contestsParticipated = contestsTable ? Array.from(contestsTable.querySelectorAll('tr')).length : 0;
      console.log('Contests table:', contestsTable?.outerHTML || 'Not found');

      return data;
    });

    console.log('Profile Data:', profileData);
    await page.screenshot({ path: `debug-${username}.png` }); // Save screenshot with username
    await browser.close();

    res.json(profileData);
  } catch (error) {
    console.error('Error fetching CodeChef profile:', error.message);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message || 'Failed to fetch CodeChef profile' });
  }
});

module.exports = router;