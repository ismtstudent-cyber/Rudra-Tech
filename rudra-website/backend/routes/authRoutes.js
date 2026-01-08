const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', authController.loginAdmin);

// Protected routes
router.get('/me', authMiddleware, authController.getCurrentAdmin);

module.exports = router;
