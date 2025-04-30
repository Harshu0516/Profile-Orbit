/* eslint-disable */
const { JSDOM } = require('jsdom');
const axios = require('axios');

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

async function getCodeChefContestList() {
  try {
    const response = await axios.get('http://localhost:5000/api/contests'); // Backend proxy
    const html = response.data.html;

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const tables = document.querySelectorAll('.dataTable');
    if (!tables.length) throw new Error('No .dataTable elements found');

    console.log('Number of Tables:', tables.length);
    const ccContestList = [];
    extractContestFromTable(tables[1], 'Future', ccContestList);
    extractContestFromTable(tables[0], 'Present', ccContestList);
    extractContestFromTable(tables[2], 'Past', ccContestList);
    return ccContestList;
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error);
    throw error;
  }
}

module.exports = { getCodeChefContestList };