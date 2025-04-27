const express = require('express');
const { getStats, refreshStats } = require('../controllers/statsController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getStats);
router.post('/refresh', auth, refreshStats);

module.exports = router;
