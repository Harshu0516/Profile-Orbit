const express = require('express');
const multer = require('multer');
const { uploadCSV } = require('../controllers/uploadController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'upload/' });

router.post('/', auth, upload.single('file'), uploadCSV);

module.exports = router;
