const Stats = require('../models/Stats');

exports.uploadCSV = async (req, res) => {
  const userId = req.user.id;
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  // TODO: Implement CSV parsing and saving data to Stats
  res.json({ message: 'CSV Uploaded Successfully (not yet parsed)' });
};
