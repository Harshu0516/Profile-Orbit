const { fetchCodechefStats } = require('../services/codechefService');
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
    const { codechef } = req.body;
    if (!codechef) return res.status(400).json({ message: 'CodeChef username required' });

    const codechefStats = await fetchCodechefStats(codechef);

    const updatedStats = await Stats.findOneAndUpdate(
      { userId },
      { codechefStats, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json(updatedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
