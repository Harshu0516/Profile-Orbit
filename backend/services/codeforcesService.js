const axios = require('axios');

exports.fetchCodeforcesStats = async (handle) => {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    return res.data.result[0];
  } catch (error) {
    console.error('Codeforces API error:', error.message);
    throw new Error('Failed to fetch Codeforces stats');
  }
};
