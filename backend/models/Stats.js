const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leetcodeStats: Object,
  gfgStats: Object,
  codeforcesStats: Object,
  codechefStats: Object, // ✅ Added
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stats', statsSchema);
