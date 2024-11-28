async function fetchUserData(platform, userId) {
  if (platform === 'gfg') {
    return {
      userId,
      platform: 'GeeksforGeeks',
      ranking: 'Top 5',
      stars: 150,
      solvedProblems: {
        easy: 30,
        medium: 60,
        hard: 10,
      },
      activity: [
        { date: '2024-11-01', problemsSolved: 5 },
        { date: '2024-11-02', problemsSolved: 3 },
      ], // Ensure activity is always an array
    };
  } else if (platform === 'leetcode') {
    return {
      userId,
      platform: 'LeetCode',
      ranking: 'Top 10',
      stars: 200,
      solvedProblems: {
        easy: 25,
        medium: 55,
        hard: 12,
      },
      activity: [
        { date: '2024-11-01', problemsSolved: 4 },
        { date: '2024-11-02', problemsSolved: 6 },
      ], // Ensure activity is always an array
    };
  } else {
    return null; // Return null if platform is not recognized
  }
}
