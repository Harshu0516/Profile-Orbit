const axios = require('axios');

exports.fetchCodeforcesStats = async (handle) => {
  const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
  return res.data.result[0];
};
