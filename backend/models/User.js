const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  codingProfiles: {
    leetcode: String,
    gfg: String,
    codeforces: String,
    codechef: String  // ✅ Added
  }
});

module.exports = mongoose.model('User', userSchema);
