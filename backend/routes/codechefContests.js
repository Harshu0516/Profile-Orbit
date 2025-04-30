const express = require('express');
const router = express.Router();
const axios = require('axios');
const { JSDOM } = require('jsdom');

function extractContestFromTable(table, type, list) {
  if (!table || !table.rows || table.rows.length < 2) {
    console.warn(`No valid rows in ${type} table`);
    return;
  }

  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cells = row.cells;
    if (!cells || cells.length < 4) continue;

    const contest = {
      code: cells[0]?.innerText || 'N/A',
      name: cells[1]?.children[0]?.innerText || 'N/A',
      link: cells[1]?.children[0]?.href || 'https://www.codechef.com/contests/',
      startTime: cells[2]?.innerText || 'N/A',
      endTime: cells[3]?.innerText || 'N/A',
      phase: type,
    };
    list.push(contest);
  }
}

router.get('/contests', async (req, res) => {
  try {
    const response = await axios.get('https://www.codechef.com/contests/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const html = response.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const tables = document.querySelectorAll('.dataTable');
    if (!tables.length) {
      throw new Error('No .dataTable elements found');
    }

    console.log('Number of Tables:', tables.length);
    const ccContestList = [];
    extractContestFromTable(tables[1], 'Future', ccContestList);
    extractContestFromTable(tables[0], 'Present', ccContestList);
    extractContestFromTable(tables[2], 'Past', ccContestList);

    res.json(ccContestList);
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error.message);
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
});

module.exports = router;