const Stats = require('../models/Stats');

exports.uploadCSV = async (req, res) => {
  const userId = req.user.id;
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  // Parse CSV here (not fully implemented)
  res.json({ message: 'CSV Uploaded Successfully' });
};
