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

  try {
    const res = await axios.post(
      'https://leetcode.com/graphql',
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.data.data.matchedUser.submitStats.acSubmissionNum;
  } catch (error) {
    console.error('LeetCode API error:', error.message);
    throw new Error('Failed to fetch LeetCode stats');
  }
};
