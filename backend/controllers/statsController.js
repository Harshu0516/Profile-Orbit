const { fetchLeetCodeStats } = require('../services/leetcodeService');
const { fetchCodeforcesStats } = require('../services/codeforcesService');
const { scrapeGFGProfile } = require('../services/gfgScraperService');
const Stats = require('../models/Stats');

exports.getStats = async (req, res) => {
  const userId = req.user.id;
  try {
    const stats = await Stats.findOne({ userId });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshStats = async (req, res) => {
  const userId = req.user.id;
  try {
    const { leetcode, codeforces, gfg } = req.body;
    const leetcodeStats = await fetchLeetCodeStats(leetcode);
    const codeforcesStats = await fetchCodeforcesStats(codeforces);
    const gfgStats = await scrapeGFGProfile(gfg);

    const updatedStats = await Stats.findOneAndUpdate(
      { userId },
      { leetcodeStats, codeforcesStats, gfgStats, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json(updatedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
