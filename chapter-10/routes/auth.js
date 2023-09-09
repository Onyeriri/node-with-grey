const express = require('express');
const handleLogin = require('../controllers/authController');
const router = express.Router();

router.get('/', handleLogin);

module.exports = router;