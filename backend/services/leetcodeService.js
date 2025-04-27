const axios = require('axios');

exports.fetchLeetCodeStats = async (username) => {
  const query = `
    query {
      matchedUser(username: "${username}") {
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  const res = await axios.post('https://leetcode.com/graphql', { query }, {
    headers: { 'Content-Type': 'application/json' }
  });

  return res.data.data.matchedUser.submitStats.acSubmissionNum;
};
